import React, { useState } from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import styles from "./ClotheCustomisation.module.css";

function ClotheCustomisation({ selectedItemAttribute, name, setFunction }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    if (selectedItem === item) {
      // If the clicked item is already selected, toggle it off
      setSelectedItem(null);
      setFunction(null);
    } else {
      // Otherwise, select the clicked item
      setSelectedItem(item);
      setFunction(item);
    }
  };
  return (
    <>
      <Box>
        <Typography
          variant="h5"
          sx={{ paddingRight:"4vw", paddingTop: "4vh", paddingBottom: "2vh", color: "#58315c" }}
        >
          {name}
        </Typography>
        <Grid
          container
          spacing={{ xs: 4, md: 4 }}
          columns={4}
          sx={{
            justifyContent: "center",
          }}
        >
          {selectedItemAttribute.map((item, index) => (
            <Grid key={index} item>
              <Card
                className={`${styles.clothecard} ${
                  selectedItem === item ? styles.active : ""
                }`}
                sx={{ padding: "15px", cursor: "pointer" }}
                onClick={() => {
                  handleItemClick(item);
                }}
              >
                {item}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
export default ClotheCustomisation;
