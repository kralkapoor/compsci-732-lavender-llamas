import React, { useState, useEffect } from "react";
import axios from "axios";
import OotdTile from "./OotdTile";
import styles from "./OutfitOfTheDay.module.css";
import { InputLabel, Typography, Box, Button, Grid } from "@mui/material";
import { CompactPicker } from "react-color";
import Heading from "../Heading/Heading";
import getUserEmail from "../../helpers/getUserEmail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import llamaLoad from "../../assets/llamaLoad.gif";
import handingTowel from "../../assets/towelHang.png";
import { NavLink } from "react-router-dom";
import Loading from "../LoadingImage/Loading"


const OutfitOfTheDay = () => {
  const tempTiles = [
    {
      id: 1,
      img: llamaLoad,
      desc: "Loading...",
    },
    {
      id: 2,
      img: llamaLoad,
      desc: "Loading...",
    },
    {
      id: 3,
      img: llamaLoad,
      desc: "Loading...",
    },
  ];

  // Define states
  const [username, setUsername] = useState("llama");
  const [weatherText, setWeatherText] = useState(false);
  const [weatherErr, setWeatherErr] = useState(false);
  const [weatherValues, setWeatherValues] = useState([]);
  const [outfitColor, setColor] = useState("undefined");
  const [recommendations, setRecommendations] = useState(
    tempTiles
      .map((rec) => ({
        id: rec.id,
        img: rec.img,
        desc: rec.desc,
      }))
      .map((rec) => (
        <div key={rec.id} className={styles.Ootd}>
          <OotdTile
            description={rec.desc}
            imgLink={rec.img}
            outfits={[rec.shoes, rec.top, rec.bottom]}
          />
        </div>
      ))
  );
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Get weather data from weatherAPI proxy
  useEffect(() => {
    const fetchWeather = async () => {
      const email = await getUserEmail();
      axios
        // Email sent as query string to extract @ server side
        .get(`http://localhost:3006/weather/data?email=${email.email}`)
        .then((res) => {
          setWeatherValues(res.data);
          setWeatherText(true);
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            "An error occurred while trying to get your weather data."
          );
          setWeatherErr(true);
        });
    };
    fetchWeather();
  }, []);

  /* Gets the name of the user based on their login credentials */
  useEffect(() => {
    const getName = async () => {
      const postBody = {
        email: await getUserEmail().email,
      };
      axios
        .post("http://localhost:3006/ootd/getName", postBody)
        .then((res) => 
        setUsername(res.data.name))
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred while trying to retrieve your name.");
        });
    };
    getName();
    // console.log(`username = ${username}`);
  }, []);

  /* Gets the user's email to associate recommendations with the current accoutn */
  async function handleRecommendationTiles() {
    toast.promise(
      new Promise(async (resolve, reject) => {
        const email = await getUserEmail();

        setShowRecommendations(true);

        fetch("http://localhost:3006/api/generateOutfits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            weatherValues: weatherValues,
            colorScheme: outfitColor.hex,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Unable to access generate outfits api");
            }
            return response.json();
          })
          .then((data) => {
            let responseText = JSON.parse(data.responseText);

            // Loads the objects from the responses into an array - used by the outfit cards

            const items = [
              {
                id: 1,
                img: data.imageUrls[0],
                desc: responseText.recommendation1.outfitDescription,
                shoes: responseText.recommendation1.shoes,
                top: responseText.recommendation1.top,
                bottom: responseText.recommendation1.bottom,
              },
              {
                id: 2,
                img: data.imageUrls[1],
                desc: responseText.recommendation2.outfitDescription,
                shoes: responseText.recommendation2.shoes,
                top: responseText.recommendation2.top,
                bottom: responseText.recommendation2.bottom,
              },
              {
                id: 3,
                img: data.imageUrls[2],
                desc: responseText.recommendation3.outfitDescription,
                shoes: responseText.recommendation3.shoes,
                top: responseText.recommendation3.top,
                bottom: responseText.recommendation3.bottom,
              },
            ];

            const tiles = items
              .map((rec) => ({
                id: rec.id,
                img: rec.img,
                desc: rec.desc,
                shoes: rec.shoes,
                top: rec.top,
                bottom: rec.bottom,
              }))
              .map((rec) => (
                <div key={rec.id} className={styles.Ootd}>
                  <OotdTile
                    description={rec.desc}
                    imgLink={rec.img}
                    shoes={rec.shoes}
                    bottom={rec.bottom}
                    top={rec.top}
                  />
                </div>
              ));
            // Upon success, set and show the recommendation cards with generated outfits
            setRecommendations(tiles);

            resolve({
              message: "Outfits generated successfully",
              type: toast.TYPE.SUCCESS,
            });
          })
          .catch((error) => {
            console.error("Error generating outfit recommendations:", error);
            reject({
              message: "Failed to generate outfits!",
              type: toast.TYPE.ERROR,
            });
            setShowRecommendations(false);
          });
      }),
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        pending: "Generating Outfits",
        success: "Outfits generated successfully 👌",
        error: "Failed to generate outfits 🤯",
        autoClose: 3000,
      }
    );
  }

  return (
    <>
      <Box>
        <Box>
          <Heading title="OUTFIT OF THE DAY" />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-evenly",
            alignContent: "center",
            margin: "auto",
          }}
        >
          {weatherText ? (
            <>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={8}
                direction="column"
              >
                <Grid item xs={1} md={1}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    spacing={10}
                    sx={{ marginTop: "2vh" }}
                  >
                    <Grid item xs={8} md={4}>
                      <Box
                        sx={{
                          backgroundColor: "#fefefe",
                          padding: "1vh",
                          borderRadius: "2vh",
                          height: "30vh",
                          padding: "2vh",
                          width: "100%",
                          margin: "auto",
                          minWidth: "40vh",
                        }}
                      >
                        <InputLabel
                          sx={{
                            paddingBottom: "2vh",
                            fontFamily:
                              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                            fontSize: "3vh",
                          }}
                        >
                          Today's Weather
                        </InputLabel>
                        {/* If there is an error getting weather values, greeet the user and inform them that the api is not working*/}
                        {weatherValues && weatherText && (
                          <Box className={styles.title}>
                            <img
                              src={weatherValues.iconUrl}
                              alt="Weather icon based on the weather today"
                            />{" "}
                            <br />
                            <Typography
                              sx={{
                                fontFamily:
                                  "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                                paddingTop: "2vh",
                                fontSize: "2.5vh",
                                color: "#58315CD8",
                              }}
                            >
                              {weatherValues.tempC} with{" "}
                              {weatherValues.humidity} humidity. 
                              <br/> 
                              Windspeed at{" "}
                              {weatherValues.windKph}.{" "}
                            </Typography>
                          </Box>
                        )}

                        {weatherErr && (
                          <Box className={styles.title}>
                            <Typography>
                              Unable to fetch weather details at the moment. Try
                              again soon.
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Box
                        sx={{
                          backgroundColor: "#fefefe",
                          padding: "2vh",
                          borderRadius: "2vh",
                          height: "30vh",
                          width: "100%",
                          margin: "auto",
                          minWidth: "40vh",
                        }}
                      >
                        <InputLabel
                          sx={{
                            paddingBottom: "2vh",
                            fontFamily:
                              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                            fontSize: "3vh",
                          }}
                        >
                          Select a Color Scheme<br></br> (<i>Optional</i>)
                        </InputLabel>
                        <div style={{ flex: "1", overflow: "auto" }}>
                          <CompactPicker
                            color={outfitColor}
                            onChange={setColor}
                          />
                        </div>
                      </Box>
                    </Grid>{" "}
                    <Grid item xs={8} md={4}>
                      <Box
                        sx={{
                          backgroundColor: "#fefefe",
                          padding: "1vh",
                          borderRadius: "2vh",
                          height: "30vh",
                          width: "100%",
                          margin: "auto",
                          minWidth: "40vh",
                        }}
                      >
                        <InputLabel
                          sx={{
                            fontFamily:
                              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                            fontSize: "3vh",
                            paddingBottom: "2vh",
                          }}
                        >
                          Your Wardrobe{" "}
                          <span style={{ color: "#8cc423", fontSize: "2vh" }}>
                            <br></br>
                          </span>
                        </InputLabel>
                        <NavLink to={"/wardrobe"}>
                          <img
                            src={handingTowel}
                            style={{
                              display: "flex",
                              height: "18vh",
                              justifyContent: "center",
                              margin: "auto",
                              alignItems: "center",
                            }}
                          />
                        </NavLink>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Button
                    sx={{
                      borderRadius: "25vh",
                      backgroundColor: "white",
                      border: "0.1vh solid #ccc",
                      color: "#333",
                      boxShadow: "1vh 1vh 4vh rgba(255, 255, 255, 0.8)",
                      padding: "1vh 4vh",
                      marginTop: "2vh",
                      width: "40vh",
                      color: "#58315CD8",
                    }}
                    className={styles.generateButton}
                    onClick={handleRecommendationTiles}
                  >
                    GENERATE OUTFIT
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <Box>
              <Loading></Loading>
            </Box>
          )}
        </Box>
      </Box>
      <br />

      {showRecommendations && (
        <div className={styles.recommendationTiles}>{recommendations}</div>
      )}
    </>
  );
};

export default OutfitOfTheDay;
