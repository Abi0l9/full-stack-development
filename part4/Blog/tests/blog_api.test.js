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
  }, 10000);

  test("get status", async () => await api.get("/info").expect(200));

  test("get blog list", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(4);
  });

  test("test for id", async () => {
    const response = await api.get("/api/blogs");

    const result = await response.body[0].id;
    expect(result).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
