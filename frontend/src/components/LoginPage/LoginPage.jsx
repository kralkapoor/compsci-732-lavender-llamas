import "./LoginPage.module.css";
import { Box, Input, InputLabel, Grid, InputAdornment } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./LoginPage.module.css";
import Heading from "../Heading/Heading";
import AuthContext from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../../assets/show.png";
import lashIcon from "../../assets/hide.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  /* Checks whether the user is authenticated */
  const { setUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  /* Submits the data in the login form to the server and checks the credentials */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3006/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
        credentials: "include",
      });

      {
        /* Generates a toastify message in place of an alert to let the user know if the login was successful */
      }
      if (response.ok) {
        setUserAuthenticated(true);
        toast.success("Log in successful");
        navigate("/ootd");
      } else {
        const error = await response.json();
        console.error(error);
        toast.error("Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div>
      <Heading title="Login" />
      <Box
        className={styles.formContainer}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "0",
          flexDirection: "column",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            flexDirection="column"
            spacing={3}
          >
            <Grid item xs={12} md={12}>
              <InputLabel
                htmlFor="email"
                sx={{
                  paddingTop: "3vh",
                  paddingBottom: "2vh",
                  color: "#fefefe",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
              >
                EMAIL
              </InputLabel>
              <Input
                required
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "20px",
                  boxShadow: "2px 2px 5px rgba(255, 255, 255, 0.8)",
                  height: "40px",
                  width: { xs: "80vw", md: "60vh" },
                  margin: "auto",
                  backgroundColor: "white",
                  textAlign: "center",
                  alignContent: "center",
                  caretColor: "black",
                }}
                type="email"
                onChange={handleChange}
                disableUnderline={true}
                name="email"
                id="email"
                value={data.email}
                placeholder={"llama@lavenderllama.co.nz"}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box
                style={{
                  display: "flex",
                  width: "70vh",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  paddingTop: "2vh",
                  margin: "auto",
                }}
              >
                <InputLabel
                  htmlFor="password"
                  sx={{
                    paddingTop: "3vh",
                    paddingBottom: "2vh",
                    color: "#fefefe",
                    fontFamily:
                      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  }}
                >
                  PASSWORD
                </InputLabel>
                <Box sx={{ display: "flex" }}>
                  <Input
                    required
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "20px",
                      boxShadow: "2px 2px 5px rgba(255, 255, 255, 0.8)",
                      height: "40px",
                      margin: "auto",
                      width: { xs: "80vw", md: "60vh" },
                      backgroundColor: "white",
                      textAlign: "center",
                      alignContent: "center",
                      caretColor: "black",
                    }}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={data.password}
                    disableUnderline={true}
                    placeholder={""}
                    name="password"
                    id="password"
                    endAdornment={
                      /* Toggles the password to be shown or hidden when the eye is clicked */
                      <InputAdornment position="end">
                        <div style={{ position: "relative" }}>
                          <img
                            src={showPassword ? eyeIcon : lashIcon}
                            alt="Eye icon to display or hide password"
                            className={styles.passwordIcon}
                            style={{
                              display: "flex",
                              position: "absolute",
                              cursor: "pointer",
                              justifyContent: "center",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              width: "20px",
                              height: "20px",
                            }}
                            onClick={toggleShowPassword}
                          />
                        </div>
                      </InputAdornment>
                    }
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <button
                id="submit-button"
                type="submit"
                className={styles.submitButton}
              >
                SUBMIT
              </button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default LoginPage;
