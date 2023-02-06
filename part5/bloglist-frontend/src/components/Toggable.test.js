import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Toggable from "./Toggable";

describe("<Toggable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Toggable buttonText="show">
        <div className="testDiv">togglable content</div>
      </Toggable>
    ).container;
  });

  test("renders its children", () => {
    const div = container.querySelector(".testDiv");
    expect(div).toHaveTextContent("togglable content");
    screen.debug(div);
  });
});
