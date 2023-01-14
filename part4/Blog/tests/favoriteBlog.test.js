const listHelper = require("../utils/list_helper");
const blogsList = require("../utils/blogsList");

describe("favourite blog", () => {
  test("with the most likes", () => {
    const result = listHelper.favoriteBlog(blogsList);
    expect(result).toEqual(12);
  });
});
