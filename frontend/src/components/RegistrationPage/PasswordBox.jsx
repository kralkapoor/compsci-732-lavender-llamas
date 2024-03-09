import { Box, Input, InputLabel, useMediaQuery, useTheme } from "@mui/material";
import style from "../RegistrationPage/Registration.module.css";
import { useState } from "react";
import eyeIcon from "../../assets/show.png";
import lashIcon from "../../assets/hide.png";

export default function PasswordBox({ data, handleChange }) {

  /* Creates a hook that allows the user to toggle the password being visible */
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  /* Creates a theme from the default MUI settings to set the size of the components based on screen size */
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
    {/* A box that contains the input labels and input fields for the password section of the registration page. */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <InputLabel
          htmlFor="password"
          className={style.registerLabel}
          style={{
            paddingBottom: "5px",
            textTransform: "uppercase",
            fontFamily:
              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
            color: "#fefefe",
          }}
        >
          Password
        </InputLabel>
        <div className={style["wrapper"]}>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className={style["register-input"]}
            value={data.password}
            onChange={handleChange}
            placeholder=""
            style={{
              backgroundColor: "white",
              width: isLargeScreen ? "50vw" : "72vw",
              height: "4.5vh",
              paddingLeft: "20px",
            }}
            sx={{
              '&:before': {
                borderBottom: 'none',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
              },
            }}
          />
          {/* Sets an eye icon that when clicked toggles the input field between being a password display and plain text */}
          <img
            src={showPassword ? lashIcon : eyeIcon}
            className={style["password-icon"]}
            onClick={toggleShowPassword}
            alt="Eye icon to display or hide password"
          />
        </div>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Replicates the previous password field and checks it against the previously entered password */}
        <InputLabel
          htmlFor="reenter-password"
          className={style.registerLabel}
          style={{
            paddingBottom: "5px",
            textTransform: "uppercase",
            fontFamily:
              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
            color: "#fefefe",
          }}
        >
          Re-enter Password
        </InputLabel>
        <div className={style["wrapper"]}>
          <Input
            type={showPassword ? "text" : "password"}
            name="repassword"
            id="reenter-password"
            className={style["register-input"]}
            value={data.repassword}
            onChange={handleChange}
            placeholder=""
            style={{
              backgroundColor: "white",
              width: isLargeScreen ? "50vw" : "72vw",
              height: "4.5vh",
              paddingLeft: "20px",
            }}
            sx={{
              '&:before': {
                borderBottom: 'none',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
              },
            }}
          />
          <img
            src={showPassword ? lashIcon : eyeIcon}
            className={style["password-icon"]}
            onClick={toggleShowPassword}
          />
        </div>
      </Box>
    </>
  );
}
