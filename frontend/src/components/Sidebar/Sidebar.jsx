import React, { useState, useEffect, useContext } from "react";
import { Drawer, IconButton, List, ListItemText, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import style from "./Sidebar.module.css";
import AuthContext from "../../AuthContext";
import checkSession from "../../helpers/checkSession";
import handleLogout from "../../helpers/handleLogout";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
   /* Gets the authentication of the users and initiates the sidebar (drawer) component that has a default of closed */
  const navigate = useNavigate();
  const { userAuthenticated, setUserAuthenticated } = useContext(AuthContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  async function handleLogOut() {
    await handleLogout(setUserAuthenticated);
    navigate('/login');
  }

  useEffect(() => {
    checkSession(setUserAuthenticated);
  }, []);

  {/* Sets the links available in the sidebar if the user is logged in.
  Visible if viewing the project on a smaller screen  */}
  const loggedInSidebar = (

    <List style={{ fontSize: "30px", paddingLeft: "20px" }}>
      <NavLink to={"/ootd"}>
        <ListItemText>OUTFIT</ListItemText>
      </NavLink>
      <NavLink to={"/wardrobe"}>
        <ListItemText>WARDROBE</ListItemText>
      </NavLink>
      <NavLink to={"/pastOutfits"}>
        <ListItemText>FAVOURITES</ListItemText>
      </NavLink>
      <NavLink to={"/Settings"}>
        <ListItemText>SETTINGS</ListItemText>
      </NavLink>
      <NavLink to={'/'}>
        <ListItemText onClick={handleLogOut}>LOGOUT</ListItemText>
      </NavLink>
      
    </List>
  );

  /* Sets the visible links on the sidebar when the user is not logged in.
  Visible when viewing the project on a smaller screen */
  const loggedOutSidebar = (

    <List style={{ fontSize: "30px", paddingLeft: "20px" }}>
      <NavLink to={"/login"}>
        <ListItemText>LOGIN</ListItemText>
      </NavLink>
      <NavLink to={"/register"}>
        <ListItemText>REGISTER</ListItemText>
      </NavLink>
    </List>
  );

  /* Sets the styling of the sidebar and populates the links based on a user's logged in status */
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        PaperProps={{
          sx: { width: "40%" },
        }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List className={style.navbarLinks}>
          {userAuthenticated ? loggedInSidebar : loggedOutSidebar}
        </List>
        <Divider />
        <NavLink
          to="/disclaimer"
          style={{ textAlign: "center", color: "lightgrey" }}
        >
          Disclaimer
        </NavLink>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default Sidebar;
