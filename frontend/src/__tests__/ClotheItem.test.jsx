import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ClothesItem from "../components/ClotheItem/ClotheItem";

describe("ClothesItem", () => {
  const mockOnClick = jest.fn();
  const mockItem = { src: "test-image.jpg", name: "Test Item" };

  it("should render an image and call onClick when clicked", () => {
    const { getByRole } = render(
      <ClothesItem item={mockItem} onClick={mockOnClick} />
    );

    const image = getByRole("img");
    fireEvent.click(image);

    expect(mockOnClick).toHaveBeenCalledWith(mockItem);
  });
}); 
