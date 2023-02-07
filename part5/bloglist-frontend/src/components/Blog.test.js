import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
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
    container = render(<Blog user={user} blog={blog} />).container;
  });

  test("container test", () => {
    const div = container.querySelector(".visibleArea");
    screen.debug(div);
    expect(div).toHaveTextContent("Title");
    expect(div).not.toHaveTextContent("Url");
    expect(div).not.toHaveTextContent("Likes");
    expect(div).not.toHaveTextContent("Author");
  });
});
