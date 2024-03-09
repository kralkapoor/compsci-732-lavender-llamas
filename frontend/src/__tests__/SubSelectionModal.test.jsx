import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SubSelectionModal from "../components/SubSelectionModal/SubSelectionModal";

describe("SubSelectionModal", () => {
  const itemsToShow = [
    { id: 1, name: "Shirt", src: "shirt.jpg" },
    { id: 2, name: "Pants", src: "pants.jpg" },
  ];

  it("renders a grid of clothing items", () => {
    render(<SubSelectionModal itemsToShow={itemsToShow} />);
    const shirtImage = screen.getByAltText("Shirt");
    const pantsImage = screen.getByAltText("Pants");
    expect(shirtImage).toBeInTheDocument();
    expect(pantsImage).toBeInTheDocument();
  });

  it("opens the modal when a clothing item is clicked", () => {
    render(<SubSelectionModal itemsToShow={itemsToShow} />);
    const shirtCard = screen.getByAltText("Shirt");
    fireEvent.click(shirtCard);
    const modalTitle = screen.getByRole("heading", { name: "Shirt" });
    expect(modalTitle).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    render(<SubSelectionModal itemsToShow={itemsToShow} />);
    const shirtCard = screen.getByAltText("Shirt").closest(".clothecard");
    fireEvent.click(shirtCard);
    const closeButton = screen.getByRole("button", { name: "close button" });
    fireEvent.click(closeButton);
    const modalTitle = screen.queryByRole("heading", { name: "Shirt" });
    expect(modalTitle).not.toBeInTheDocument();
  });
});
