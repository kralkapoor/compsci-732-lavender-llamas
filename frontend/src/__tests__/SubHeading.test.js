import React from "react";
import { render } from "@testing-library/react";
import SubHeading from "../components/SubHeading/SubHeading";

describe("SubHeading component", () => {
  it("renders the subtitle correctly", () => {
    const subtitle = "This is a subtitle";
    const { getByText } = render(<SubHeading subtitle={subtitle} />);
    expect(getByText(subtitle)).toBeInTheDocument();
  });

  it("renders the correct CSS class", () => {
    const subtitle = "This is a subtitle";
    const { container } = render(<SubHeading subtitle={subtitle} />);
    expect(container.firstChild).toHaveClass("subheading");
  });
});
