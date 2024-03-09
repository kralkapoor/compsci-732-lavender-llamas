import React, { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Llama from "../../assets/llama.png";
import Sidebar from "../Sidebar/Sidebar";
import AuthContext from "../../AuthContext";
import checkSession from "../../helpers/checkSession";
import handleLogout from "../../helpers/handleLogout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [initalScrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  /*Creates the hooks that account for the position of the navbar before scrolling down the page and sets when the navbar will be visible again based on the current scroll position against the previous scroll position */
  const handleScroll = () => {
    const currentPageScroll = window.pageYOffset;

    /* Sets the height of the page scroll. Looks at the initial page scroll position of 0 and sets the height that it is visible */
    setVisible(
      (initalScrollPosition > currentPageScroll &&
        initalScrollPosition - currentPageScroll > 60) ||
      currentPageScroll < 10
    );

    setScrollPosition(currentPageScroll);
  };

  const { userAuthenticated, setUserAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    // authenticated status check
    // Call the checkSession function when the component mounts.
    //checks authenticated status to toggle between login and logout buttons.
    checkSession(setUserAuthenticated);

  }, [handleLogOut])
  /**Handles the scrolling event to trigger the navbar transition */
  useEffect(() => {

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [initalScrollPosition, visible, handleScroll]);

  async function handleLogOut(setUserAuthenticated) {
    await handleLogout(setUserAuthenticated);
  };

  return (
    <React.Fragment>
      {/* Sets a Mui appbar that serves as a navigation bar with a transparent background */}
      <AppBar
        sx={{ background: "transparent", boxShadow: "none", justifyContent: "space-between", display: "flex", margin: "auto" }}
        style={{ top: visible ? "0" : "-20vh", transition: "top 0.2s" }}
      >
        <Toolbar
          className="toolbarContainer"
          sx={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Franklin Gothic",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          {/* Changes the displayed links based on the screen size */}
          <Box sx={{ display: "flex", justifyContent: "flex-start", float: "left", }}>
            <NavLink to="/">
              <img src={Llama} alt="llama homepage icon" width="40px" />
            </NavLink>
            {isMatch && (
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{ fontSize: "2rem", paddingLeft: "10px", color: "white", }}
                >
                  LLAMAFY
                </Typography>
              </NavLink>
            )}
          </Box>

          {!isMatch && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "auto",
                  textAlign: "right",
                  float: "right"
                }}
              >
                {/* Sets the navLinks available if the users are logged in to allow them access to their pages */}
                {userAuthenticated && (
                  <>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "auto" }}>
                      <NavLink
                        to="/ootd"
                        style={{
                          textDecoration: "none",
                          marginLeft: "2vw",
                          marginRight: "2vw",
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        OUTFIT
                      </NavLink>
                      <NavLink
                        to="/wardrobe"
                        style={{
                          textDecoration: "none",
                          marginLeft: "2vw",
                          marginRight: "2vw",
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        WARDROBE
                      </NavLink>
                      <NavLink
                        to="/pastOutfits"
                        style={{
                          textDecoration: "none",
                          marginLeft: "2vw",
                          marginRight: "2vw",
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        FAVOURITES
                      </NavLink>
                      <NavLink
                        to="/settings"
                        style={{
                          textDecoration: "none",
                          marginLeft: "2vw",
                          marginRight: "2vw",
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        SETTINGS
                      </NavLink>
                    </Box>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginLeft: "auto",
                  fontSize: 20,
                }}
              >
                {/* If users are not authenticated it sets the navbar to only display the login and register buttons */}
                {userAuthenticated ? (
                  <>
                    <Box>
                      <NavLink to="/" style={{ textDecoration: "none" }}>
                        <Button
                          onClick={handleLogOut}
                          sx={{ marginRight: "10px", color: "white" }}
                        >
                          LOGOUT
                        </Button>
                      </NavLink>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
                      <NavLink to="/login" style={{ textDecoration: "none" }}>
                        <Button sx={{ marginRight: "10px", color: "white" }}>
                          LOGIN
                        </Button>
                      </NavLink>
                      <NavLink to="/register" style={{ textDecoration: "none" }}>
                        <Button sx={{ color: "white" }}>REGISTER</Button>
                      </NavLink>
                    </Box>

                  </>
                )}
              </Box>
            </Box>
          )}

          {isMatch && <Sidebar />}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
