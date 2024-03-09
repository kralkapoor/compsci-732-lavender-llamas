import { Box, Input, InputLabel, useMediaQuery, useTheme } from "@mui/material";
import style from "../RegistrationPage/Registration.module.css";

export default function NamesBox({ data, handleChange }) {
  /* Creates a theme from the default MUI settings to set the size of the components based on screen size */
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box className={style.NameBoxContainer}
      display="flex"
      width={isLargeScreen ? "50vw" : "70vw"}
      sx={{
        gap: isLargeScreen ? "10vw": "7vw"
      }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <InputLabel
          htmlFor="first-name"
          className={style.registerLabel}
          style={{
            paddingBottom: "5px",
            textTransform: "uppercase",
            fontFamily:
              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
            color: "#fefefe",
          }}
        >
          First Name
        </InputLabel>
        <Input
          type="text"
          name="firstName"
          id="first-name"
          className={style["register-input"]}
          value={data.firstName}
          onChange={handleChange}
          placeholder="Llama"
          style={{
            backgroundColor: "white",
            width: isLargeScreen ? "20vw" : "32vw",
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
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <InputLabel
          htmlFor="last-name"
          className={style.registerLabel}
          style={{
            paddingBottom: "5px",
            textTransform: "uppercase",
            fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
            color: "#fefefe",
            
          }}
        >
          Last Name
        </InputLabel>
        <Input
          type="text"
          name="lastName"
          id="last-name"
          className={style["register-input"]}
          value={data.lastName}
          onChange={handleChange}
          placeholder="Alpaca"
          style={{
            backgroundColor: "white",
            width: isLargeScreen ? "20vw" : "32vw",
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
      </Box>
    </Box>
  );
}
