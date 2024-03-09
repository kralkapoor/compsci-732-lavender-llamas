require('dotenv').config();
const OpenAI = require("openai");
const openai = new OpenAI();

const imgGen = async (prompt) => {
  
  // This will call the DALL-E to generate a 512x512 image of a given prompt
  // Each davinci return prompt contains three DALL-E generation prompts
  // Therefore this is called three times per davinci response
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    // size: "512x512",
    size: "1024x1024",
    quality: "hd",
    style: "vivid",
    response_format : "url",
  });

  // Extract the URL from the response
  console.log("dalle")
  console.log(response.data[0].url);
  const genUrl = response.data[0].url;
  return genUrl;
}

module.exports = { imgGen };
