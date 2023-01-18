jest.useFakeTimers();
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogModel");

describe("when there are initially saved blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("get status", () => {
    const response = api.get("/info").expect(200);
  });

  test("get blog list", () => {
    const response = api
      .get("api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(4);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
