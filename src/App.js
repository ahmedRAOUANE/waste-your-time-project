
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// pages
import LandingPage from "./Pages/landingPage/LandingPage";
import HomePage from "./Pages/homePage/HomePage";

const App = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        {user ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}
      </Routes>
    </>
  );
};

export default App;
