import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClothingSelectionModal from "../components/ClothingSelectionModal/ClothingSelectionModal";
import { Button } from "@mui/material";

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

describe("ClothingSelectionModal", () => {
  it("should call onCloseModal when close button is clicked", () => {
    const onCloseModal = jest.fn();
    const selectedItem = {
      name: "test",
      category_id: "1",
    };

    render(
      <ClothingSelectionModal
        selectedItem={selectedItem}
        showModal={true}
        onCloseModal={onCloseModal}
      />
    );

    const closeButton = screen.getByAltText("close button");
    fireEvent.click(closeButton);

    expect(onCloseModal).toHaveBeenCalledTimes(1);
  });

  test("should call handleAddClick when add button is clicked", () => {
    const handleAddClickMock = jest.fn();

    render(
      <Button
        data-testid="add-button"
        sx={{ color: "white" }}
        onClick={handleAddClickMock}
      >
        Add
      </Button>
    );

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    expect(handleAddClickMock).toHaveBeenCalledTimes(1);
  });
});
