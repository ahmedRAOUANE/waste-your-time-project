import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

// pages
import LoginPage from "./Pages/loginPage/LoginPage";
import LandingPage from "./Pages/landingPage/LandingPage";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/create account" element={<LoginPage />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
