const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("../routes/WardrobePage");
const WardrobePageController = require("../controllers/WardrobePage");

// Mock the addWardrobeItem function
jest.mock("../controllers/WardrobePage", () => ({
  addWardrobeItem: jest.fn().mockResolvedValue(1),
}));

// Create an Express app and use the router
const app = express();
app.use(bodyParser.json());
app.use("/", router);

describe("POST /addWardrobeItem", () => {
  it("should return the new item ID and a 201 status code", async () => {
    const sampleData = {
      user_email: "test@example.com",
      category_id: 1,
      color: "blue",
      style: "casual",
      sleeves: "short",
      pattern: "striped",
    };
    const response = await request(app)
      .post("/addWardrobeItem")
      .send(sampleData)
      .expect(201);
    expect(response.body).toEqual({ item: 1 });
    expect(WardrobePageController.addWardrobeItem).toHaveBeenCalledWith(sampleData);
  });

  it("should return a 500 status code if an error occurs", async () => {
    const sampleData = {
      user_email: "test@example.com",
      category_id: 1,
      color: "blue",
      style: "casual",
      sleeves: "short",
      pattern: "striped",
    };
    // Mock the addWardrobeItem function to throw an error
    WardrobePageController.addWardrobeItem.mockRejectedValue(new Error("Database error"));
    const response = await request(app)
      .post("/addWardrobeItem")
      .send(sampleData)
      .expect(500);
    expect(response.body).toEqual({ error: "Internal server error" });
    expect(WardrobePageController.addWardrobeItem).toHaveBeenCalledWith(sampleData);
  });
});
