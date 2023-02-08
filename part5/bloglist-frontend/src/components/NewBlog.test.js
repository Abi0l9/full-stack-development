import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./NewBlog";
import NewBlog from "./NewBlog";

describe("<NewBlog />", () => {
  let container;
  let mockHandler;

  beforeEach(() => {
    mockHandler = jest.fn();
    container = render(<NewBlog handleBlogSubmit={mockHandler} />).container;
  });

  test("test new blog", async () => {
    const user = userEvent.setup();
    const button = container.querySelector("#create");

    const title = screen.getByTestId("title");
    const author = screen.getByTestId("author");
    const url = screen.getByTestId("url");
    const likes = screen.getByTestId("likes");

    await user.type(title, "This is the title");
    await user.type(author, "This is the author");
    await user.type(url, "This is the url");
    await user.type(likes, "400");

    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe("This is the title");
    expect(mockHandler.mock.calls[0][0].author).toBe("This is the author");
  });
});
