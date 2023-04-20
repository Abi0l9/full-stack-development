const blogsList = require("../utils/blogsList");
const listHelper = require("../utils/list_helper");

describe("most blogs", () => {
  test("by an author", () => {
    const result = listHelper.mostBlogs(blogsList);
    const received = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    expect(result).toStrictEqual(received);
  });
});
