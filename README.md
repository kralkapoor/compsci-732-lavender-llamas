# LLAMAFY

Have you ever looked in your wardrobe and decided you have nothing to wear? Have you warn the same outfit two weeks in a row? Who are you? Steve Jobs*?

Well look in panic and worry no more! 

Introducting LLAMAFY!

*Even he did this whole wearing the same outfit everyday thing so that it would be one less decision for him to make. So realistically he should be the one making this not us just saying...

### What we are

Are we human? Dancer? No! We're LLAMAFY! Powered by AI and run by a team of indecisive lavender llamas (that moonlight as insomniacs), we decided to make our lives easier and your lives cooler by simplifying one of the hardest parts of the day; getting dressed!

LLAMAFY aims to make your life at least 10x** easier and save you up to 16*** hours a week by allowing you to forgo making one more decision a day. Based on the items that you already have in your wardrobe, we will generate three potential outfits for you to choose from at a time and make your life that much simpler. 

**Gross overestimation for dramatic effect.
***Another guestimate. Some of the llamas are not great at maths but are full of enthusiasm.
## Usage

You can use LLAMAFY with these simple steps:

1. Register with LLAMAFY and submit some of the basics that you have in your wardrobe
2. Go to your wardrobe and generate your outfit for the day
3. Sit back and watch a llama pick your outfit!

From here you can select the outfits that you like and the ones you don't. You can keep an eye on past outfits that you have warn and you can simplify your morning (or afternoon, we don't judge) decision making process by not having to choose what to wear.


### Software

For this project we had originally considered using the DERN stack (Dynamo, Express, React, Node.js) but later decided to move to a variation of the MERN stack where, instead of using MongoDB, we used MySQL due to the teams familiarity with the software already and the belief that this would be the best fit based on the way that we had planned to impliment the database.

Additionally, in order to make the project function, we we employed the use of ChatGPT and Dalle to help generate prompts and images based on the clothing items the users had indicated that their wardrobes contained. These are further explained in their own section below.

We also used a variety of packages to help ease the implementation of the front end of the project such as Material UI (MUI) to ensure responsiveness and with the additional HTML-like functionality of forms etc. We also tested a variety of packages that were designed for specific functions like react-colour which provides the functionality of a variety of colour pickers, along with many others, some of which were later removed from the project due to their lack of compatability with what we wanted the site to do. For example, we trialed useing react-pro-sidebar but due to the lack of understandability of the development notes and the developers seemingly giving up on the package themselves, we settled for using MUI Appbar.

## Running the project
To get the site up and running, please follow below steps:

### Front end

To run the frontend, open up a terminal in the frontend folder and run:

```
npm install
npm run start
```
Easy as that!

### Back end

To run the backend, open up a terminal in the backend folder and run:
```
npm install
```
then
```
node index.js

```
or
```
npm start
```

### Local host
Once you have run both your frontend and backend, go to your local host to view the site.

### Functional login credentials

If for whatever reason you do not wish to register but still want to have a look around the website, we have set up an account populated with dummy data that you are free to use.

- Email: test@test.test
- Password: test

(Secure, we know)


## Running Tests

To run tests, navigate to the relevant folders (backed, frontend) and run the following command

```bash
  npm run test .
```


## Pages

Here you can find a brief overview of the pages that we have available to peruse at your leisure. Please note: some may only be navigatible to once logged in.

### Landing Page

![LandingPageImage](https://github.com/UOA-CS732-SE750-Students-2023/project-group-lavender-llamas/blob/84a471040b3962dd309b8aea645f4aa5e88ad56e/frontend/src/assets/LandingPage.png)

The landing page is the first of the pages that you will see when you open our application. From here you are able to navigate to different pages depending on whether you are logged in or not, and are introduced to a bit about the purpose of the application.

In this section you are also able to navigate to the disclaimer page or you can do so at anytime from the sidebar.

### Registration Page

The registration page allows users to sign up and register some information about themselves. They are able to specify their:
- Name
- Email (used for login purposes)
- Password (which also checks that the passwords match and allow users to view the entered password by clicking on the eye icon)
- Primary location (accounts for the city that the person is based in and helps in the generating an outfit based on the local weather)
- Style preference (generates outfits based on the traditional preferences of each gender although this can be changed based on what the user has in their wardrobe)

### Login Page

The login page allows the users to log in with their provided email address and password that they provided on registration. This login information and the authentication token generated from this is what sets the links that appear in the navbar and sidebar depending on logged in status. This key is stored in a users local storage.

### Wardrobe

The wardrobe page is where users specify the items that they want to be included in their wardrobe, that is the clothing items that will be fed into the prompt so the algorithm can generate an outfit based on the clothes that they own.

We decided on the following categories to allow users to pick from:

- Tops
- Bottoms
- Jumpers
- Jackets
- Onepiece
- Swimwear
- Shoes
- Accessories

When the user clicks on a modal, they will see an 'ADD ITEMS' button which allows them to add a piece of clothing to their wardrobe. Once this button is clicked, it opens up another sub modal which includes subcategories, e.g. Tops has T-shirt, Shirt, Blouse and Crop-top subcategories. Once the user clicks on a subcategory, they will be able to specify details like Colour, Sleeves, Style and Pattern of their clothing item. Once these are specified, they can click ADD to add the item to their wardrobe, or CANCEL to cancel the selections.

If the user had previously added a piece of clothing to their wardrobe, they will be able to view the details of their outfits displayed on the modal window when they click on a given category. Additionally, they have the option to remove any clothing item from their wardrobe by clicking on the bin symbol located next to each item.

### Outfit Generation 

The wardrobe generation page allows users to specify the type of outfit that they are looking to wear on the day and can be customised based on what they have registered as being in their closet. It then generates three possible outfit choices using Dalle to provide images based on the AI prompt created by the user.

They are able to specify:
- Colour (the primary colour that they would like the outfit to be)

That's about it. The whole reason that people are using this site is so they don't have to make decisions so we figured we'd keep it simple.

Once a user clicks generate they will be presented with three outfits that they are able to click on and open the modals for. In the modals the user is able to select 'yes!' to indicate that they like the generated outfit which will then add that item to favourites. Alternatively, the user can select the button that indicates that the outfit is not for them which will close the modal.

### Settings 

This page contains a form with the following fields, most of them can be edited to update user information:
- Email: Please note this field cannot be edited.
- First Name
- Last Name
- Style Preference
- Skin Tone
- Location
- New Password
- Re-enter New Password
- Current Password: required to update any changes

Once the user is happy with the information they have updated and inserted their current password, they can click on the SUBMIT button for the new information to be saved.

### Disclaimers/FAQ

This section doubles as a bit of a gag page but also an explanation into why we made some of the choices in designing the application the way that we did. We have also used this page as a way to explain the future developments that we had planned for this project, but were not feasible to impliment at this point in time due to a varity of factors.

Many of the elements mentioned here are those that were included in the could have or nice to have section of our design proposal that unfortunately at this stage did not make it into the final product. However, we felt it was import to address them and consider them to be potential future developments that the 'company' may decide to impliment in future releases.

## Accessibility

We want to make sure that LLAMAFY is accessible to everyone. Our team has taken the following steps to make the application more accessible:

- Keyboard Navigation: LLAMAFY can be navigated using only the keyboard. We have made sure that all interactive elements on the site, such as buttons and links, can be accessed and operated using the keyboard alone.

- Color Contrast: We have designed the site with color contrast in mind to ensure that the content is readable for people with low vision or color blindness. We have used high contrast colors for the text and background, and we have made sure that the text is large enough to read.

- Screen Reader Compatibility: LLAMAFY is compatible with screen readers. We have added alternative text to all images, and we have made sure that the site is designed in a logical and easy-to-navigate way for screen reader users.

- Forms and Labels: All forms on LLAMAFY have labels associated with them. This helps users understand what information is required in each field and is especially helpful for screen reader users.

If you have any suggestions for how we can improve the accessibility of LLAMAFY, please don't hesitate to reach out to us. We are always looking for ways to make our application more accessible for everyone.

## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** MySQL

### Express

The project server runs on Express. An AWS EC2 instance was initially hosting our server, but we were unable to resolve issues with user authentication on web browsers which was not observed when running locally. We ultimately decided to forego the online hosting. 

### OpenAI API

This project utlizes two models from the OpenAI API. 

We are using the text-davinci-003 model for text completion when receiving intelligent outfit suggestions. One JSON template string is populated and then sent to davinci, where it substitutes values at certain positions. The inputs to the template string are:
* The user's wardrobe items
* The chosen colour scheme
* The user's gender
* The current weather conditions from the weather API

The davinci model responds likewise in JSON with three outfit recommendations with notable values each:
* Top recommendation (id, description, colour etc)
* Bottom recommendation
* One piece recommendation (if applicable)
* Shoes recommendation
* A DALL-E prompt describing the above outfit to be passed to the DALL-E model
* A high-level outfit description

Each DALL-E prompt (three in total) received from the davinci prompt is fed into an async function which returns a generated image URL from the DALL-E model. This is then used in the image tags on the frontend.

We chose to use the OpenAI API because of its current relevance and we were interesting to learn how it worked, and to what extent.

### Weather API

For getting the current weather conditions we opted for an API provided by https://www.weatherapi.com. We have a separate proxy route that accesses this API with our key in a .env file in our backend. We chose this API because of its ease of use, requiring only a city name as an argument in its GET query string body. Before settling on this API, we tested an alternative that required latitude and longitude coordinates to be input as a query string for the GET request. The team managed to find a csv online of all major cities in the world and their coordinates. Using this data, we created a LOCATION mapping table that we could use to map the coordinate to the city name, circumventing the user having to input their coordinates. After moving to the current API, we left the LOCATION table as is, in case we needed future location data.

### MySQL Database

The project uses MySQL as its relational database management system. The database contains several tables:

#### Category Table

This table stores information about the category of clothes that can be added to a user's wardrobe


#### Users Table

This table stores information about registered users, including their email, encrypted password, and other user details.

#### Clothing Items Table

This table stores information about each clothing item that a user adds to their wardrobe, including the clothing id, category, and other clothing details. Each clothing item is associated with a specific user through their email.

#### User Session 

This table is used for authentication and stores the user's encrypted session id's to verify their login status

#### Database Schema

The following ERD consists of the tables described above, with relationships between them as follows:

![MySQL ERD](https://github.com/UOA-CS732-SE750-Students-2023/project-group-lavender-llamas/assets/42294625/ad50abe5-d502-4e80-a842-bd44b3967a96)


#### Further details

We chose MySQL because of its popularity, reliability, and ease of use. We utilized the mysql2 package to handle the database connection and queries in our Node.js server.
## License

[MIT](https://choosealicense.com/licenses/mit/)

This project was completed as part of the COMPSCI 732/SE 750 Course on the 12th day of May 2023.

Contributers:

- Kinzi Ceolin
- Caitlin Greenough
- Dong Woo Hong
- Karl Kapoor
- Cassandra Pham
- Yash Rraj Sood

![llama](https://github.com/UOA-CS732-SE750-Students-2023/project-group-lavender-llamas/assets/42294625/4785291d-b37f-40a0-ab1c-812bc070573f)
