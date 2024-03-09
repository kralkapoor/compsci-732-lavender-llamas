const db = require("../database/pool");
const { imgGen } = require('./Dalle');
require('dotenv').config();
const OpenAI = require("openai");
const openai = new OpenAI();

// Define function to generate outfits
async function generateOutfits(user_email, weatherValues, colorScheme) {
    // Log a message indicating that the function has been called
    console.log(
        "Called Generating outfits function for " +
            user_email +
            ", with color scheme: " +
            colorScheme
    );

    // Extract the temperature and condition values from the weatherValues object
    const weatherVals = {
        temp: weatherValues.tempC,
        condition: weatherValues.condition,
    };

    // Log a message indicating that the function is awaiting the promptGenerator function
    console.log("awaiting promptGenerator");

    // Call the promptGenerator function to generate the prompt
    const prompt = await promptGenerator(user_email, weatherVals, colorScheme);

    // Log a message indicating that the function is awaiting a response from the OpenAI API
    console.log("awaiting response");

    try {
        const response = await openai.chat.completions.create({
            messages: [{role: "user", content: prompt}],
            model: "gpt-4",
            stop: null,
            n: 1,
            max_tokens: 2047
          });

        // Extract the response text from the API response
        // let responseText = response.data.choices[0].text;
        console.log(response.choices[0]);
        let responseText = response.choices[0].message.content;
        console.log(responseText);

        try {
            // Log a message indicating that the function is generating DALL-E images
            console.log("Generating Dall-E Images");

            // Parse the response text as JSON
            let toJson = JSON.stringify(responseText);
            toJson = JSON.parse(responseText);

            // Construct prompts for the DALL-E model
            const dallePrompt1 =
                toJson.recommendation1.dalle + " Hyper Realistic Style";
            const dallePrompt2 =
                toJson.recommendation2.dalle + " Hyper Realistic Style";
            const dallePrompt3 =
                toJson.recommendation3.dalle + " Hyper Realistic Style";

            // Log a message indicating that the function is awaiting DALL-E image generation
            console.log("waiting for dalle");

            // Generate the DALL-E images
            const images = await Promise.all([
                imgGen(dallePrompt1),
                imgGen(dallePrompt2),
                imgGen(dallePrompt3),
            ]);

            // Return the response text and image URLs
            return {
                responseText: responseText,
                imageUrls: [images[0], images[1], images[2]],
            };
        } catch (dalleErr) {
            // Log any errors that occur during DALL-E image generation
            console.log(dalleErr);
        }
    } catch (error) {
        // Log any errors that occur during OpenAI API call
        console.log(error);
    } finally {
        // Log a message indicating that the function has ended
        console.log("end generator");
    }
}


// Define a function to get the user's wardrobe
async function getUserWardrobe(user_email) {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all(`SELECT ClothingItem.clothing_id, Category.main_category, Category.sub_category, ClothingItem.color, ClothingItem.sleeves, ClothingItem.pattern, ClothingItem.style, ClothingItem.lastWorn FROM ClothingItem INNER JOIN Users ON ClothingItem.user_email = Users.email INNER JOIN Category ON ClothingItem.category_id = Category.category_id WHERE Users.email = ? AND (ClothingItem.lastWorn IS NULL OR julianday('now') - julianday(ClothingItem.lastWorn) > 2)`, [user_email], (err, rows) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);  // Reject the promise in case of an error
                } else {
                    resolve(rows);  // Resolve the promise with the retrieved rows
                }
            });
        });
  
        // Release the database connection
        //conn.release();

        // Initialize an empty object to hold the clothing items by category
        const clothingItemsByCategory = {};

        // Loop through each row in the query results
        rows.forEach((row) => {
            const {
                clothing_id,
                main_category,
                sub_category,
                color,
                sleeves,
                pattern,
                style,
            } = row;

            // If the main category of the clothing item does not exist in the object, create an empty array for it
            if (!clothingItemsByCategory[main_category]) {
                clothingItemsByCategory[main_category] = [];
            }

            // Push the clothing item data to the array for the main category
            clothingItemsByCategory[main_category].push({
                clothing_id,
                sub_category,
                color,
                sleeves,
                pattern,
                style,
            });
        });

        // Return the clothing items by category
        return clothingItemsByCategory;
    } catch (err) {
        throw err;
    }
}

async function getUserData(user_email) {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all("SELECT gender, skinTone FROM Users WHERE email = ?", [user_email], (err, rows) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.length === 0) {
            // Handle the case where no user is found
            console.error(`User with email ${user_email} not found`);
            return null; // or throw an error, based on your error handling strategy
        }

        // Assuming the query returned at least one row
        const user = rows[0];
        // console.log('User data:', user); // Properly log the user object

        // Construct and return the description
       return user;
    } catch (error) {
        console.error('Error in getUserData:', error);
        throw error; // Rethrow or handle the error appropriately
    }
}


async function promptGenerator(user_email, weatherValsObj, colorScheme) {
    // if the weather API endpoint cannot be reached upstream, assume good weather
    if (
        weatherValsObj.temp == undefined ||
        weatherValsObj.condition == undefined
    ) {
        weatherValsObj.temp = 20;
        weatherValsObj.condition = "fine";
    }
    // Get the user data and wardrobe data for that user
    const [userData, userWardrobe] = await Promise.all([
        getUserData(user_email),
        getUserWardrobe(user_email),
    ]);

    // Check if a color was defined and change string based on that
    var colorAddString = "";
    if (colorScheme != undefined) {
        colorAddString = `If possible and if the user's wardrobe permits, try following this color scheme: ${colorScheme}`;
    }

    var prompt = `Given the following JSON of clothes, suggest three outfits to wear today for a ${userData.gender}, given that the temperature outside is ${
        weatherValsObj.temp
    } degrees celsius and ${weatherValsObj.condition}. ${colorAddString}

  ${JSON.stringify(userWardrobe)}
  IMPERATIVE: Respond in the below valid JSON format (i.e., you are a simple endpoint that provides parsable JSON only and no other chat based text), substituting % with the values but do not actually include the % sign if there are no values. Do not provide a value for a category if it is covered by another piece of clothing. In the "dalle" property, provide a comprehensive prompt to give to the DALL-E model, do not give it a hex color, but an actual color name. Focus on providing detail on colour. For the outfitDescription, give a small sentence of what the is included in the outfit.
  {
    "recommendation1": {
      "top": [
        {
          "id": "%",
          "description": "%",
          "colour": "%",
          "subCategory": "%"
        }
      ],
      "bottom": [
        {
          "id": "%",
          "description": "%",
          "colour": "%",
          "subCategory": "%"
        }
      ],
      "onePiece": [
        {
          "id": "%",
          "description": "%",
          "colour": "%",
          "subCategory": "%"
        }
      ],
      "shoes": [
        {
          "id": "%",
          "description": "%",
          "colour": "%",
          "subCategory": "%"
        }
      ],
      "dalle": "A full-body lookbook style photograph of a male model wearing %",
      "outfitDescription": "%"
    },
    "recommendation%": {
      "top": "%..."
    }
  }`;

    console.log(`prompt: ${prompt}`);
    return prompt;
}

async function changeClotheWornDate(clothesIDs) {

    const now = new Date();

    for (const clothing_id of clothesIDs) {
      await new Promise((resolve, reject) => {
        db.run('UPDATE ClothingItem SET lastWorn = ? WHERE clothing_id = ?', [now, clothing_id], function(err) {
          if (err) {
            console.log(`Error updating lastWorn for clothing_id ${clothing_id}:`, err);
            reject(err);
          } else {
            console.log(`Updated lastWorn for clothing_id ${clothing_id}`);
            resolve();
          }
        });
      });
    }
}

module.exports = { generateOutfits, changeClotheWornDate, getUserWardrobe, getUserData, promptGenerator };
