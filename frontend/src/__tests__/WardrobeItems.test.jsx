import { render, screen } from "@testing-library/react";
import WardrobeItems from "../components/WardrobeItems/WardrobeItems";

describe("WardrobeItems component", () => {
  const mockClothes = [
    {
      clothing_id: 1,
      name: "shirt",
      color: "#FF0000",
      sleeves: "short",
      pattern: "solid",
      style: "casual",
      sub_category: "tops",
    },
    {
      clothing_id: 2,
      name: "pants",
      color: "#0000FF",
      sleeves: "long",
      pattern: "striped",
      style: "formal",
      sub_category: "bottoms",
    },
  ];

  it("should render a list of clothes items", () => {
    render(<WardrobeItems clothes={mockClothes} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(mockClothes.length);
  });

});
