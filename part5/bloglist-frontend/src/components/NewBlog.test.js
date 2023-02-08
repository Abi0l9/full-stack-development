import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { getByText, render, screen } from "@testing-library/react";
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
  });
});
