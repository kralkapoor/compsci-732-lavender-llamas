import { useState } from "react";
import bin from "./../../assets/bin.png";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import styles from "./WardrobeItems.module.css";
import axios from "axios";
import { subSelectionItemsByClothesItem } from "../ClothesSelection/data";
import SubSelectionModal from "../SubSelectionModal/SubSelectionModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Card for each clothes item in the list
function WardrobeItems({ clothes, setClothes, category }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [subSelectionItemsToShow, setSubSelectionItemsToShow] = useState([]);
  const [isItemsVisible, setIsItemsVisible] = useState(true); // add state variable to control item visibility

  // Handling the open modal event and setting the selected item and its sub-selection items to show
  const handleOpenModal = (item) => {
    console.log("handeOpenModal")
    console.log(item);
    console.log(item.name);
    setSelectedItem(item);
    setSubSelectionItemsToShow(subSelectionItemsByClothesItem[item.name]);
    setIsItemsVisible(false); // hide items when modal is open
  };

  // Handling the delete item event in CategoryItem
  async function handleDeleteItem(item) {
    // Double check with the user before deleting the item
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;
    // Filter out the item that was deleted from the list
    const remainingItemsToShow = clothes.filter(
      (catItem) => catItem.clothing_id !== item.clothing_id
    );

    // Send Post request to delete item from the database
    try {
      const response = await axios.post(
        `http://localhost:3006/wardrobe/deleteWardrobeItem`,
        { itemId: item.clothing_id }
      );
      // Check if the item was deleted successfully
      if (response.data.isItemDeleted) {
        toast.success(`Item id#${item.clothing_id} deleted.`);
        setClothes(remainingItemsToShow);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while trying to delete the item. Please try again later."
      );
    }
  }
  return (
    <Box alignItems="center">
      <>
        {isItemsVisible &&
          clothes.map((item) => (
            <List
              key={item.clothing_id}
              sx={{
                width: "100%",

                textAlign: "center",
                margin: "0 auto",
              }}
            >
              <ListItem
                alignItems="center"
                sx={{
                  boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
                  bgcolor: "background.paper",
                  borderRadius: 4,
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  secondary={
                    <>
                      <Typography
                        component="span"
                        sx={{ paddingRight: 4 }}
                        color="#58315CD8"
                      >
                        {GetColorName(item.color)} {item.sleeves} {item.pattern}{" "}
                        {item.style} {item.sub_category}{" "}
                        <Button
                          data-testid="deleteButton"
                          onClick={() => handleDeleteItem(item)}
                          sx={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            paddingRight: 0,
                            padding: 1,
                          }}
                        >
                          <img src={bin} alt="delete button" width={16} />
                        </Button>
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </List>
          ))}
      </>

      {isItemsVisible && (
        
        <Box className={styles.navLinkContainer}>
          
      {/* Display default message if no items to display in wardrobe */}
      {clothes.length === 0 && (
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textTransform: "lowercase",
            textAlign: "center",
            paddingTop: 2,
            fontStyle: "italic",
          }}
        >
          you don't have any {category.name} in your wardrobe
        </Typography>
      )}
          <Button
            sx={{ color: "white" }}
            onClick={() => handleOpenModal(category)}
          >
            Add items
          </Button>
        </Box>
      )}
      {!isItemsVisible && subSelectionItemsToShow && (
        <>
          {" "}
          <SubSelectionModal itemsToShow={subSelectionItemsToShow} />
        </>
      )}
    </Box>
  );
}

export default WardrobeItems;


