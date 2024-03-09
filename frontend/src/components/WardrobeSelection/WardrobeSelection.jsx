import React from "react";
import ClothesSelection from "../ClothesSelection/ClothesSelection";
import SubHeading from "../SubHeading/SubHeading";
import Heading from "../Heading/Heading";
import styles from "./WardrobeSelection.module.css";

// Component that displays all components making the WardrobeSelection page
function WardrobeSelection() {
  return (
    <>
      <section className={styles.wardrobe}>
        <Heading title="Wardrobe" />
        <SubHeading subtitle="Select some staples" />
        <ClothesSelection />
      </section>
    </>
  );
}

export default WardrobeSelection;
