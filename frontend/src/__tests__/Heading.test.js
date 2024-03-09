import React from "react";
import { render } from "@testing-library/react";
import Heading from "../components/Heading/Heading";

describe("Heading", () => {
  it("should render the title passed as props", () => {
    const title = "Test Title";
    const { getByText } = render(<Heading title={title} />);
    expect(getByText(title)).toBeInTheDocument();
  });

  it("should render the title with the correct styles", () => {
    const title = "Test Title";
    const { getByText } = render(<Heading title={title} />);
    const titleElement = getByText(title);
    expect(titleElement).toHaveClass("title");
  });
});
