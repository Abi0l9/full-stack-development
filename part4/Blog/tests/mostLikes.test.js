const blogsList = require("../utils/blogsList");
const listHelper = require("../utils/list_helper");

describe("Blog", () => {
  test("by an author with the most likes", () => {
    const result = listHelper.mostLikes(blogsList);
    const received = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };

    expect(result).toStrictEqual(received);
  });
});
