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

  test("add new blog", async () => {
    const newBlog = new Blog({
      title: "new Blog",
      author: "Khalifah",
      url: "https://cnn.com",
      likes: "30000",
    });

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogAtEnd = await helper.blogInDb();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("test info", async () => {
    await api.get("/api/blogs/info").expect(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
