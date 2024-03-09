import React, { useEffect, useState } from "react";
import styles from "./ClothesSelection.module.css";
import { Grid, Box, Modal, Button, Typography } from "@mui/material";
import ClothesItem from "../ClotheItem/ClotheItem";
import close from "./../../assets/close.png";
import useGet from "../../helpers/useGet";
import { clothesItems } from "./data";
import WardrobeItems from "../WardrobeItems/WardrobeItems";
import getUserEmail from "../../helpers/getUserEmail";
import Loading from "../LoadingImage/Loading"

function ClothesSelection() {
  // Defining state variables for the modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryItemsToShow, setCategoryItemsToShow] = useState([]);
  const [wardrobe, setwardrobe] = useState([]);

  // Get user's email from cookie once cookie's set up
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    async function fetchUserEmail() {
      const email = await getUserEmail();
      setUserEmail(email.email);
    }
    fetchUserEmail();
  }, [setUserEmail]);

  // Get user's current profile data from database
  const { data: databaseWardobe, isLoading } = useGet(
    `http://localhost:3006/wardrobe/getWardrobeItems/${userEmail}`,
    openModal
  );
  // check that the wardrobe data has been fetched from the database
  const [dataFetched, setDataFetched] = useState(false);
  // Set the wardrobe state to the wardrobe items from the database
  useEffect(() => {
    if (!isLoading && databaseWardobe.wardrobeItems) {
      setwardrobe(databaseWardobe.wardrobeItems);
      setDataFetched(true);
    }
  }, [isLoading, databaseWardobe?.wardrobeItems, categoryItemsToShow]);

  // Set the wardrobe state to the wardrobe items from the database
  useEffect(() => {
    if (selectedItem && wardrobe.length > 0) {
      // console.log("selectedItem and wardrobe.length > 0 is true");
      console.log(selectedItem);
      // console.log(wardrobe);
      const itemsToShow = wardrobe.filter(
        (clothe) => clothe.main_category === selectedItem.name // this is case sensitive. i set the db up with non capitalised names and have suffered greatly because local data is allcaps
      );
      setCategoryItemsToShow(itemsToShow);
      setOpenModal(true);
    }
  }, [selectedItem]);

  // Handle the open modal event and setting the selected item to show
  const openWardrobeModal = (item) => {
    setSelectedItem(item);
    const itemsToShow = wardrobe.filter(
      (clothe) => clothe.main_category === item.name
    );
    setCategoryItemsToShow(itemsToShow);
    setOpenModal(true);
  };

  // Handle the close modal event
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {dataFetched ? (
        <Box sx={{ flexGrow: 1, maxWidth: "90vw", alignItems: "center" }}>
          <Grid
            className={styles.clothespanel}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 6, md: 9, lg: 12 }}
            sx={{
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            {/* Map over the clothes items and create a ClothesItem for each one */}
            {clothesItems.map((item, index) => (
              <Grid key={index} item xs={3}>
                <ClothesItem item={item} onClick={openWardrobeModal} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Loading></Loading>
        </Box>
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        disableAutoFocus={true}
        sx={{ overflowY: "scroll" }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(321deg, rgba(99,93,191,1) 3%, rgba(217,139,223,1) 61%)",
            borderRadius: "16px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
            height: "fit-content",
            margin: "auto",
            padding: "40px",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <Button
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 8, right: 2, padding: "5px" }}
          >
            <img src={close} alt="close button" width="15px" />
          </Button>
          {selectedItem && (
            <Typography
              variant="h4"
              sx={{ textAlign: "center", margin: "10px", color: "white" }}
            >
              YOUR {selectedItem.name}
            </Typography>
          )}
          {selectedItem && (
            <WardrobeItems
              category={selectedItem}
              clothes={categoryItemsToShow}
              setClothes={setCategoryItemsToShow}
            ></WardrobeItems>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ClothesSelection;
