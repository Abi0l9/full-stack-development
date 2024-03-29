const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blogModel");
const User = require("../models/user");

describe("all blog tests", () => {
  describe("when there are initially saved blogs", () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await Blog.insertMany(helper.initialBlogs);
    }, 15000);

    test("test info", async () => {
      await api.get("/api/blogs/info").expect(200);
    });

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

  describe("addition of new blogs", () => {
    let token = "";
    beforeEach(async () => {
      await Blog.deleteMany({});
      await User.deleteMany({});
      await Blog.insertMany(helper.initialBlogs);

      const passwordHash = await bcrypt.hash("secret", 10);
      const user = new User({ username: "root", name: "admin", passwordHash });

      await user.save();

      token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 }
      );
    }, 15000);

    test("add new blog", async () => {
      const newBlog = {
        title: "xi Blog",
        author: "Khalifah",
        url: "ffffffff",
        likes: "200",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogAtEnd = await helper.blogInDb();

      expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    });

    test("likes field zero test", async () => {
      const newBlog = {
        title: "another Blog",
        author: "Khalifah",
        url: "https://cnn.com",
        likes: "",
      };
      if (newBlog.likes === "") {
        newBlog.likes = 0;
      }

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(+newBlog.likes).toBeGreaterThanOrEqual(0);

      const blogAtEnd = await helper.blogInDb();

      expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    });

    test("url and title fields", async () => {
      const newBlog = {
        title: "xiv Blog",
        author: "Khalifah",
        likes: "2",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogAtEnd = await helper.blogInDb();

      expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe("editing a single field", () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await Blog.insertMany(helper.initialBlogs);
    }, 15000);

    test("likes field", async () => {
      const blogs = await helper.blogInDb();
      const blogToUpdate = blogs[0];

      await api
        .patch(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: "30000" })
        .expect(200);

      const blogAtEnd = await helper.blogInDb();
      expect(blogAtEnd[0].likes).toBe("30000");
    });
  });

  describe("when deleting a blog", () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await Blog.insertMany(helper.initialBlogs);
    }, 15000);

    test("delete a blog", async () => {
      const blogs = await helper.blogInDb();
      const blogToDelete = blogs[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(200);

      const blogAtEnd = await helper.blogInDb();
      expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
