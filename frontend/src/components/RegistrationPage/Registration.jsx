import { useState } from "react";
import style from "../RegistrationPage/Registration.module.css";
import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import bcrypt from "bcryptjs";
import NamesBox from "./NameBox";
import EmailBox from "./EmailBox";
import LocationBox from "./LocationBox";
import GenderButtons from "./GenderButtons";
import PasswordBox from "./PasswordBox";
import axios from "axios";
import Heading from "../Heading/Heading";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Sets the bcrypt salting function to 10 interations (cost factor) of salting */
const salt = bcrypt.genSaltSync(10);

function RegistrationPage() {
  /* Initiates the navigate function as well as imports the theme from MUI so that the styling can be set on a larger screen */
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  /* Sets the data that will be fed to the server */
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
    location: "",
    gender: "",
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  /* Handles the button selection for the gender selection and the value chosen */
  const handleButtonClick = (gender) => {
    setData({ ...data, gender });
  };

  /* Function that handles the click of the submit button. Sends the data to the server to store so that the user can log in and access the data associated with their account */
  const handleSubmit = async (event) => {
    event.preventDefault();

    {/* Checks that the passwords match. If they do not the users see a toastify message informing them */}
    if (data.password !== data.repassword) {
      toast.error("Your passwords must match.");
    } else if (Object.values(data).includes("")) {

      {/* If any of the input fields are blank they will see an error toastify message */}
      toast.error("All details on this form are required.");
    } else {

      {/* If both passwords match and all input fields are filled out the password is then hashed */}
      const hashedPassword = bcrypt.hashSync(data.password, salt);

      {/* Once hashed the submit button will attempt to post the users data to the server and display a success toast if successful navigating the user to the login page */}
      try {
        await axios.post("http://localhost:3006/registration/registerNewUser", {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashedPassword,
          location: data.location,
          gender: data.gender,
        });
        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {

        {/* Displays an error message if there is an issue contacting the server or an issue with submitting the data */}
        console.log(error);
        toast.error(
          "An error occurred while registering. Please try again later." +
          String(error)
        );
      }
    }
  };

  return (
    <>
      <Heading title="Register" />
      {/* Creates a MUI grid of the register page to contain the components */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12} md={8} lg={6}>
          <form onSubmit={handleSubmit} >
            {/* A form that directs to the handle submit function upon pressing the submit button
            *The box contains the input fields set within their individual files */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              rowGap="0.6vh"
              style={{ paddingBottom: "3vh", maxWidth: "70vw" }}
            >
              <NamesBox data={data} handleChange={handleChange} />
              <EmailBox data={data} handleChange={handleChange} />
              <PasswordBox data={data} handleChange={handleChange} />
              <LocationBox data={data} handleChange={handleChange} />
              <GenderButtons data={data} handleButtonClick={handleButtonClick} />
              <Button
                id={style.submitButton}
                type="submit"
                style={{ width: isLargeScreen ? "50vw" : "70vw" }}
              >
                SUBMIT
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default RegistrationPage;
