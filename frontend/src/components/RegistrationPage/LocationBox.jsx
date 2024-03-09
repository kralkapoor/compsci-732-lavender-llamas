import { Box, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import style from "../RegistrationPage/Registration.module.css";

export default function LocationBox({ data, handleChange }) {
  const locations = [
    "Auckland",
    "Wellington",
    "Christchurch",
    "Dunedin",
    "Invercargill",
  ];
  /* Creates a theme from the default MUI settings to set the size of the components based on screen size */
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const selectStyle = {
    backgroundColor: "white",
    borderRadius: "25px",
    height: "4.5vh",
    color: "black",
    fontFamily: "Franklin Gothic Medium, 'Arial Narrow', Arial, sans-serif",
    textAlign: "center",
    fontWeight: "1px",
    justifyContent: "center",
    disableUnderline: true,
    width: isLargeScreen ? "50vw" : "72vw",
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <InputLabel
        id="location-label"
        htmlFor="location"
        className={style.registerLabel}
        style={{
          paddingBottom: "5px",
          textTransform: "uppercase",
          fontFamily:
            "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
          color: "#fefefe",
        }}
      >
        Primary Location
      </InputLabel>
      <Select
        aria-labelledby="location-label"
        name="location"
        id="location"
        className={style["register-input"]}
        value={data.location}
        onChange={handleChange}
        style={selectStyle}
        sx={{
          '&:before': {
            borderBottom: 'none',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
          },
        }}
      >
        <MenuItem value="" style={{ color: "black" }} disabled>
          Which city should LLAMAFY base recommendations on?
        </MenuItem>
        {locations.map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
