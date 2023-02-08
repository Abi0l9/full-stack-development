import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const user = { username: "Kash" };
  const blog = {
    title: "test blog",
    author: "kash",
    likes: "4",
    url: "www.com",
    user: { username: "kash" },
  };

  beforeEach(() => {
    const mockHandler = jest.fn();

    container = render(
      <Blog user={user} updateLikesField={mockHandler} blog={blog} />
    ).container;
  });

  test("visible component of the blog renders the title ", () => {
    const div = container.querySelector(".visibleArea");
    expect(div).toHaveTextContent("Title");
    expect(div).not.toHaveTextContent("Url");
    expect(div).not.toHaveTextContent("Likes");
    expect(div).not.toHaveTextContent("Author");
  });

  test("url, number of likes and user are displayed when button is pressed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");

    const div = container.querySelector(".hiddenArea");
    expect(div).toHaveStyle("display: none");

    await user.click(button);

    expect(div).toHaveStyle("display: block");

    expect(div).toHaveTextContent("Url");
    expect(div).toHaveTextContent("ikes");
    expect(div).toHaveTextContent("Author");
  });

  test("test number of clicks", async () => {
    const mockHandler = jest.fn();

    render(<Blog user={user} blog={blog} updateLikesField={mockHandler} />);

    const btnUser = userEvent.setup();
    const button = container.querySelector("#likeBtn");

    await btnUser.click(button);
    screen.debug(button);
    expect(mockHandler.mock.calls).toHaveLength(1);
    // console.log(mockHandler.mock.calls);
  });
});
