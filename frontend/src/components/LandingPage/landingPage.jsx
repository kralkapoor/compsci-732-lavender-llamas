import styles from "./landingPage.module.css";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import ClothingRail from "../../assets/cothingRail.gif";
import WardrobeChange from "../../assets/Wardorbe-Change.gif";
import { Box, Button, Grid, Typography, Card } from "@mui/material";

function LandingPage() {
  return (
    <React.Fragment>
      <Box className={styles.landingPage}>
        <Box style={{ width: "cover", height: "80vh", margin: "auto" }}>
          <h1 className={styles.landingPageTitle}>LLAMAFY</h1>
          <h2 className={styles.landingPageSubtitle}>
            IT'S TIME TO BUTTON UP OR SHUT UP
          </h2>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "5%",
              paddingRight: "5%",
              width: "80%",
              margin: "auto",
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={5}
            >
              {/* Grid section to contain the buttons that direct users to the alternative pages */}
              <Grid item className={styles.buttonStyle}>
                <NavLink to="/login">
                  <Button
                    sx={{
                      borderRadius: "40px",
                      boxShadow: "2px 2px 5px rgba(255, 255, 255, 0.8)",
                      textAlign: "center",
                      padding: "5% 5%",
                      width: "30vh",
                      fontFamily:
                        "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
                      fontSize: "3vh",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      color: "#58315cd8",
                      cursor: "pointer",
                      margin: "0px 5px",
                      outline: "none",
                    }}
                  >
                    LOGIN
                  </Button>
                </NavLink>
              </Grid>
              <Grid item className={styles.buttonStyle}>
                <NavLink to="/register">
                  <Button
                    sx={{
                      borderRadius: "4vh",
                      boxShadow: "2px 2px 5px rgba(255, 255, 255, 0.8)",
                      textAlign: "center",
                      padding: "5% 5%",
                      width: "30vh",
                      fontSize: "3vh",
                      fontFamily:
                        "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      color: "#58315cd8",
                      cursor: "pointer",
                      margin: "0px 5px",
                      outline: "none",
                    }}
                  >
                    REGISTER
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "100vh" }}>
        <h2 className={styles.llamaSubheading}>
          NO TIME FOR DRAMA? TRUST IN LLAMA!
        </h2>
        {/* Grid containing the about information related to the project e.g. what it does in a responsive grid */}
        <Grid container spacing={10} sx={{ padding: "2vh", height: "auto" }}>
          <Grid item xs={12} md={9}>
            <Box
              className={styles.aboutContainer}
              bgcolor="white"
              sx={{
                borderRadius: "25px",
                padding: "3vh",
                fontFamily: "Verdana",
                height: "auto",
                alignItems: "center",
                boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.2)",
                alignContent: "center",
              }}
              p={2}
            >
              <Typography
                sx={{
                  alignItems: "center",
                  textAlign: "justify",
                  margin: "auto",
                  color: "#58315cd8",
                  fontWeight: "100",
                  fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                  padding: "2.5vh",
                }}
              >
                Have you ever wanted to feel like Cher from clueless minus the
                incestuous undertones? Well now you can! LLAMAFY was created to
                ease your worries and allow you to make one less decision in
                your already overwhelming day. Unlike other applications that
                can make suggestions surrounding potential wardrobe choices,
                LLAMAFY employs the use of artificial intelligence to account
                for your gender, general clothing preferences based on what you
                already have in your wardrobe, and the temperature of your home
                location. This way you can rest easy knowing you will not be
                suggested speedos when it is 10 degrees celcius outside!
                Amazing! 
                <br />
                <br />
                Still need convincing? Check out our <Link to="/disclaimer" className={styles.disclaimerLink}>disclaimers and FAQs.</Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            {/* Gif container within the grid. Responsive to screen size */}
            <Card
              sx={{
                borderRadius: "25px",
                height: "100%",
                width: "100%",
                padding: "0px",
                backgroundSize: "cover",
                boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                src={WardrobeChange}
                alt="wardrobe change GIF"
                style={{ height: "100%", width: "100%", borderRadius: "25px" }}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            {/* Gif container within the grid. Responsive to screen size */}
            <Card
              sx={{
                borderRadius: "25px",
                height: "100%",
                width: "100%",
                backgroundSize: "fit",
                boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                src={ClothingRail}
                alt="clothing rail GIF"
                style={{ height: "110%", width: "110%", borderRadius: "25px" }}
              />
            </Card>
          </Grid>
          {/*  */}
          <Grid item xs={12} md={9}>
            <Box
              bgcolor="white"
              p={2}
              sx={{
                borderRadius: "25px",
                padding: "3vh",
                height: "30vh",
                alignItems: "center",
                height: "auto",
                boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Second section that introduces our website and what it does within a responsive Box */}
              <Typography
                variant="subtitle1"
                sx={{
                  alignItems: "center",
                  textAlign: "justify",
                  color: "#58315cd8",
                  padding: "2.5vh",
                  fontFamily: "Verdana, Geneva, Tahoma, sans-serif"
                }}
              >
                Simply register with us, answer some basic questions about your
                current wardrobe and you're done! Worry not, these answers can
                be altered later and change as your style and current wardrobe
                change too. We can save you up to 16* hours a week in choosing
                clothes to wear with the simple click of a button. Why waste
                time opening and closing the closet trying to decide what to
                wear? No longer do you have to take the Steve Jobs approach of
                wearing the same outfit day in and day out simply to have one
                less decision to make per day. Try LLAMAFY today!
                <br />
                <br />
                *Don't quote us on this. We're just enthusiastic! Bordering on
                unhinged! Just look at all the exclamation marks!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default LandingPage;
