const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("../routes/SettingsProfilePage");
const SettingsProflePageController = require("../controllers/SettingsProfilePage");


const testUserData = {
    email: 'johndoe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    password: '$2a$10$rNQOFp904tvE2XOhVd2vmeAN2Ybw.X5S/O9eBnh9qeEw0bKlLVDE2',
    location: 'Wellington',
    gender: 'male',
    skinTone: 'neutral'
};

// Mock the updateProfile and getProfile functions
jest.mock("../controllers/SettingsProfilePage", () => ({
    updateProfile: jest.fn(),

    getProfile: jest.fn().mockResolvedValue(testUserData),
}));

// Create an Express app and use the router
const app = express();
app.use(bodyParser.json());
app.use("/", router);


describe('Profile routes', () => {

    /* Test if post("/updateProfile/:userEmail) returns a status code of 201 and true as the value of validPass
     and call updateProfile function, if the input password is correct */
    it("POST - /updateProfile/:userEmail - correct password", async () => {
        const sampleData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@email.com',
            gender: 'male',
            skinTone: 'neutral',
            location: 'Wellington',
            password: '',
            inputPassword: 'correctpassword',
        };
        const response = await request(app)
            .post("/updateProfile/johndoe@email.com")
            .send(sampleData)
        expect(response.status).toBe(201);
        expect(response.body.validPass).toBe(true);
        expect(SettingsProflePageController.updateProfile).toHaveBeenCalledWith(sampleData);
    });


    /* Test if post("/updateProfile/:userEmail) returns a status code of 201 and false as the value of validPass, 
    if the input password is correct */
    it("POST - /updateProfile/:userEmail - incorrect password", async () => {
        const sampleData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@email.com',
            gender: 'male',
            skinTone: 'neutral',
            location: 'Wellington',
            password: '',
            inputPassword: 'incorrectpassword',
        };
        const response = await request(app)
            .post("/updateProfile/johndoe@email.com")
            .send(sampleData)
        expect(response.status).toBe(201);
        expect(response.body.validPass).toBe(false);
    });


    /* Test if post("/updateProfile/:userEmail) returns a status code of 500 if there is an error */
    it("POST - /updateProfile/:userEmail - error", async () => {
        const sampleData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@email.com',
            gender: 'male',
            skinTone: 'neutral',
            location: 'Wellington',
            password: '',
            inputPassword: 'correctpassword',
        };

        // Mock the updateProfile function to throw an error
        SettingsProflePageController.updateProfile.mockRejectedValue(new Error("Database error"));
        const response = await request(app)
            .post("/updateProfile/johndoe@email.com")
            .send(sampleData)
        expect(response.status).toBe(500);
    });


    /* Test if get("/getProfile/:userEmail) returns a status code of 201 and correct user data */
    it("GET - /getProfile/:userEmail", (done) => {
        const res = request(app)
            .get("/getProfile/johndoe@email.com")
            .send()
            .expect(201)
            .end((err, res) => {

                if (err) return done(err);

                const userData = res.body;
                expect(userData.userData).toStrictEqual(testUserData);

                return done();
            })
    });


    /* Test if get("/getProfile/:userEmail) returns a status code of 500 if there is an error */
    it("GET - /getProfile/:userEmail - error ", async () => {

        SettingsProflePageController.getProfile.mockRejectedValue(new Error("Database error"));

        const res = await request(app)
            .get("/getProfile/johndoe@email.com")
            .send()
        expect(res.status).toBe(500);
    });
});



