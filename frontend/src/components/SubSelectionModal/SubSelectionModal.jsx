import React, { useState } from "react";
import { Grid, Card } from "@mui/material";
import styles from "./SubSelectionModal.module.css";
import ClothingSelectionModal from "../ClothingSelectionModal/ClothingSelectionModal";

/*Renders the sub-selection modal component, which displays the available options
  for a selected clothe category item in the main selection modal
  Takes one prop: `itemsToShow` which is an array of clothing items to be displayed in the modal.*/

function SubSelectionModal({ itemsToShow, setClothes , clothes, wardrobe, setWardrobe}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Event handler to be called when a Card component is clicked, sets the selected item and shows the modal
  const onOpenModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  // Event handler to be called when the modal is closed, resets the selected item and hides the modal
  const onCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        sx={{
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        {/* Maps through the `itemsToShow` array and renders a grid of `Card` components
        to display the options for a selected clothe item */}
        {itemsToShow.map((item, index) => (
          <Grid key={index} item xs={12} sm={4} md={2} lg={2}>
            <Card
              className={styles.clothecard}
              sx={{
                borderRadius: "4%",
                margin: "20px",
                padding: "20px",
                justifyContent: "center",
                display: "flex",
                cursor: "pointer",
                backgroundColor: "rgba(255, 255, 255, 0.97)",
              }}
              onClick={() => onOpenModal(item)}
            >
              <img src={item.src} alt={item.name} width="100px" />
            </Card>
          </Grid>
        ))}
      </Grid>
      <ClothingSelectionModal
        selectedItem={selectedItem}
        showModal={showModal}
        onCloseModal={onCloseModal}
        wardrobe={wardrobe}
        setWardrobe={setWardrobe}
        setClothes={setClothes}
        clothes={clothes}
      />
    </>
  );
}

export default SubSelectionModal;
