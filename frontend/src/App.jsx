import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/landingPage";
import Favourites from "./components/Favourites/Favourites";
import RegistrationPage from "./components/RegistrationPage/Registration";
import LoginPage from "./components/LoginPage/LoginPage";
import WardrobeSelection from "./components/WardrobeSelection/WardrobeSelection";
import Navbar from "./components/Navbar/Navbar";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import OutfitOfTheDay from "./components/OutfitOfTheDay/OutfitOfTheDay";
import Disclaimers from "./components/Disclaimers/Disclaimer";
import AuthContext from './AuthContext';
import { useState } from 'react';
import Prevented from './Prevented';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userAuthenticated, setUserAuthenticatedState] = useState(false);

  const setUserAuthenticated = async (value) => {
    return new Promise((resolve) => {
      setUserAuthenticatedState(value);
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ userAuthenticated, setUserAuthenticated }}>
      <div className="App">
        <React.Fragment>
          <header>
            <Navbar />
          </header>

          <Routes>
            <Route path="/" element={
              <Prevented isAuthenticated={userAuthenticated}>
                <LandingPage />
              </Prevented>
            } />
            <Route path="disclaimer" element={
            <Prevented isAuthenticated={userAuthenticated}>
              <Disclaimers />
            </Prevented>
            } />
            <Route path="login" element={
              <Prevented isAuthenticated={userAuthenticated}>
                <LoginPage />
              </Prevented>
            } />
            <Route path="register" element={

              <Prevented isAuthenticated={userAuthenticated}>
                <RegistrationPage />
              </Prevented>
            } />
            {userAuthenticated ? (
              <>
                <Route path="pastOutfits" element={< Favourites />} />
                <Route path="wardrobe" element={< WardrobeSelection />} />
                <Route path="settings" element={< SettingsPage />} />
                <Route path="ootd" element={< OutfitOfTheDay />} />
              </>
            ) : (<Route path="login" element={<LoginPage/>}/>
            )}

            
          </Routes>
        </React.Fragment>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthContext.Provider>
  );
}

export default App;