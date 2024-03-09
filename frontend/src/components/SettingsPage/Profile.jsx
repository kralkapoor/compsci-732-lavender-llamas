import { InputLabel, Box } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./SettingsPage.module.css";
import useGet from "../../helpers/useGet";
import axios from "axios";
import getUserEmail from "../../helpers/getUserEmail";
import { locations } from "./data";
import { genders } from "./data";
import { skinTones } from "./data";
import Selection from "./Selection";
import { toast } from "react-toastify";
import Loading from "../LoadingImage/Loading"

function Profile() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    skinTone: "",
    location: "",
    newPassword: "",
    reNewPassword: "",
    password: "",
  });

  // Get user's email
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    async function fetchUserEmail() {
      const email = await getUserEmail();
      setUserEmail(email.email);
    }

    fetchUserEmail();
  }, []);

  // Get user's current profile data from database
  const { data: dataObj, isLoading } = useGet(
    `http://localhost:3006/profile/getProfile/${userEmail}`
  );

 
  // check that the wardrobe data has been fetched from the database
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
  
    // console.log(`useeffect: ${dataObj.fname, dataObj.email}`)
    if (!isLoading && dataObj.userData) {
      setData({
        fname: dataObj.userData.firstName,
        lname: dataObj.userData.lastName,
        email: dataObj.userData.email,
        gender: dataObj.userData.gender,
        skinTone: dataObj.userData.skinTone,
        location: dataObj.userData.location,
        newPassword: "",
        password: dataObj.userData.password,
      });

      setDataFetched(true);
    }
  }, [isLoading, dataObj]);

  const inputData = [
    {
      displayName: "EMAIL",
      type: "email",
      name: "email",
      id: "profileEmail",
      value: data.email,
      readOnly: true,
    },
    {
      displayName: "FIRST NAME",
      type: "text",
      name: "fname",
      id: "fname",
      value: data.fname,
    },
    {
      displayName: "LAST NAME",
      type: "text",
      name: "lname",
      id: "lname",
      value: data.lname,
    },
    {
      displayName: "STYLE PREFERENCE",
      type: "select",
      name: "gender",
      id: "gender",
      value: data.gender,
    },
    {
      displayName: "SKIN TONE",
      type: "select",
      name: "skinTone",
      id: "skinTone",
      value: data.skinTone,
    },
    {
      displayName: "LOCATION",
      type: "select",
      name: "location",
      id: "location",
      value: data.location,
    },
    {
      displayName: "NEW PASSWORD",
      type: "password",
      name: "newPassword",
      id: "newPassword",
      value: "",
    },
    {
      displayName: "RE-ENTER NEW PASSWORD",
      type: "password",
      name: "reNewPassword",
      id: "reNewPassword",
      value: "",
    },
    {
      displayName: "CURRENT PASSWORD*",
      type: "password",
      name: "password",
      id: "password",
      value: "",
      required: true,
    },
  ];

  // When there are changes in a field, set data to updat the property [event.target.name] to hold the value of what was inserted to the field
  async function handleChange(event) {
    const inputData = await event.target.value;
    setData({
      ...data,
      [event.target.name]: inputData,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      (data.newPassword || data.reNewPassword) &&
      data.newPassword !== data.reNewPassword
    ) {
      // If there is something in New Password or Re-enter New Passworf field and the values they don't match:
      toast.error("Your new passwords must match.");
    } else {
      // Otherwise, try posting profile data to below URL

      try {
        const response = await axios.post(
          `http://localhost:3006/profile/updateProfile/${userEmail}`,
          {
            firstName: data.fname,
            lastName: data.lname,
            email: data.email,
            gender: data.gender,
            skinTone: data.skinTone,
            location: data.location,
            password: data.newPassword,
            inputPassword: data.password,
          }
        );

        if (response.data.validPass) {
          toast.success("Update successful!");
        } else {
          toast.error("Incorrect password. Please try again!");
        }
      } catch (error) {
        console.error(error);
        toast.error(
          "An error occurred while registering. Please try again later."
        );
      }
    }
  };

  return (
    <>
      {dataFetched ? (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            {inputData.map((item) => (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                key={item.id}
              >
                {item.type !== "select" ? (
                  <>
                    <InputLabel
                      htmlFor={item.id}
                      sx={{
                        paddingTop: "25px",
                        marginBottom: "2px",
                        textAlign: "right",
                        color: "#eee",
                        fontWeight: "bold",
                        fontFamily:
                          "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                      }}
                    >
                      {item.displayName}
                    </InputLabel>

                    <input
                      className={styles.field}
                      type={item.type}
                      name={item.name}
                      id={item.id}
                      defaultValue={item.value}
                      onChange={handleChange}
                      placeholder={item.value}
                      readOnly={item.readOnly}
                      required={item.required}
                      style={item.readOnly && { backgroundColor: "#e4e0e0" }}
                    />
                  </>
                ) : (
                  <>
                    <InputLabel
                      htmlFor={item.id}
                      sx={{
                        paddingTop: "25px",
                        marginBottom: "2px",
                        textAlign: "right",
                        color: "#eee",
                        fontWeight: "bold",
                        fontFamily:
                          "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                      }}
                    >
                      {item.displayName}
                    </InputLabel>

                    {item.id == "location" ? (
                      <Selection
                        item={item}
                        options={locations}
                        selectionValue={data.location}
                        handleChange={handleChange}
                      ></Selection>
                    ) : item.id == "gender" ? (
                      <Selection
                        item={item}
                        options={genders}
                        selectionValue={data.gender}
                        handleChange={handleChange}
                      ></Selection>
                    ) : (
                      <Selection
                        item={item}
                        options={skinTones}
                        selectionValue={data.skinTone}
                        handleChange={handleChange}
                      ></Selection>
                    )}
                  </>
                )}
              </Box>
            ))}
            <button
              id="submit-button"
              type="submit"
              className={styles.submitButton}
            >
              SUBMIT
            </button>
          </form>
        </div>
      ) : (
        <div>
          <Loading></Loading>
        </div>
      )}
    </>
  );
}

export default Profile;
