import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;

  beforeEach(() => {
    container = render(<Blog />).container;
  });

  test("container test", () => {
    const div = container.querySelector(".visibleArea");
    screen.debug(div);
  });
});
