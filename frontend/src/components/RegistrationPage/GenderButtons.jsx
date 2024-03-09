import { Box, InputLabel, Grid, Button, useMediaQuery, useTheme } from "@mui/material";
import style from "../RegistrationPage/Registration.module.css";

export default function GenderButtons({ data, handleButtonClick }) {
  /* Creates a theme from the default MUI settings to set the size of the components based on screen size */
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box
        className={style.GenderButtonBox}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <InputLabel
          htmlFor="gender"
          className={style.registerLabel}
          style={{
            width: "70vh",
            display: "flex",
            justifyContent: "space-around",
            paddingBottom: "5px",
            textTransform: "uppercase",
            fontFamily:
              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
            color: "#fefefe",
          }}
        >
          Style Preference
        </InputLabel>
        <Grid container spacing={isLargeScreen ? 2 : 1} style={{ maxWidth: isLargeScreen ? "50vw" : "70vw" }}>
          <Grid item xs={12} sm={4}>
            <Button
              type="button"
              fullWidth
              className={`${style["gender-button"]} ${
                data.gender === "male" ? style["selected"] : ""
              }`}
              onClick={() => handleButtonClick("male")}
            >
              Male
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="button"
              fullWidth
              className={`${style["gender-button"]} ${
                data.gender === "female" ? style["selected"] : ""
              }`}
              onClick={() => handleButtonClick("female")}
            >
              Female
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="button"
              fullWidth
              className={`${style["gender-button"]} ${
                data.gender === "other" ? style["selected"] : ""
              }`}
              onClick={() => handleButtonClick("other")}
            >
              All
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
