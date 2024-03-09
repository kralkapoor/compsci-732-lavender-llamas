import React, { useState, useEffect } from "react";
import axios from "axios";
import OutfitTile from "./OutfitTile";
import Heading from "../Heading/Heading";
import SubHeading from "../SubHeading/SubHeading";
import getUserEmail from "../../helpers/getUserEmail";
import { Box, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Loading from "../LoadingImage/Loading"

/* Function to display the Favourite past outfits Page*/
export default function Favourites() {
  // Set the state of the file names to an empty array
  let tempArr = [];
  const [pastOutfits, setPastOutfits] = useState();
  // check that the wardrobe data has been fetched from the database
  const [dataFetched, setDataFetched] = useState(false);

  // Fetch the user's favourite outfits from the database
  useEffect(() => {
    // Function to get the user's favourite outfits saved as static files
    const getFavourites = async () => {
      let email = await getUserEmail();
      email = email.email;
      console.log(`favourites @: ${email}`)
      // Post the user's email to the route which will respond with the image files if applicable
      const postBody = {
        email: email,
      };
      await axios
        .post(`http://localhost:3006/favourites/all`, postBody)
        .then((res) => {
          // If the response is 200, set the state pastOutfits to the array of file names
          // 200 indicates that the user's public folder has been found and the files will be received as JSON
          if (res.status === 200) {
            console.log(res.data);
            tempArr = [];
            res.data.map((filename, index) => {
              tempArr.push({
                id: index + 1,
                render: `http://localhost:3006/${email}/${filename}`,
                desc: undefined,
              });
              setPastOutfits(tempArr);
            });
            setDataFetched(true);
          }
          // If the response is 202, set the state dataFetched to true
          // 202 indicates that the POST was successful, but no user folder has been identified
          // Therefore they have not saved any pictures.
          if (res.status === 202) {
            setDataFetched(true);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            "An error occurred while trying to get your favourites. Please try again later."
          );
        });
    };
    // Call the async function immediately
    getFavourites();
  }, []);

  return (
    <>
      <Heading title="Favourites" />
      <SubHeading subtitle="PAST OUTFITS" />

      {dataFetched ? (
        <Box sx={{ marginTop: 8 }}>
          {pastOutfits ? (
            <Grid
              container
              spacing={{ xs: 2, md: 6 }}
              columns={{ xs: 1, sm: 6, md: 8, lg: 12 }}
              sx={{
                justifyContent: "center",
                backgroundColor: "transparent",
              }}
            >
              {/* Loop over all the user's past outfits*/}
              {pastOutfits.map((outfitObj) => (
                <Grid
                  item
                  key={outfitObj.id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "fit-content",
                  }}
                >
                  <OutfitTile outfit={outfitObj} images={pastOutfits} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="h5"
              sx={{ color: "white", fontStyle: "italic" }}
            >
              Nothing to display yet
            </Typography>
          )}
        </Box>
      ) : (
        <Box>
          <Loading></Loading>
        </Box>
      )}
    </>
  );
}
