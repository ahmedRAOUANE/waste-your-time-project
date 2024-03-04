
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// pages
import GuestLayout from "./layout/GuestLayout";
import UserLayout from "./layout/UserLayout";
import Loading from "./components/states/Loading";

const App = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <>
      <Loading />
      <Routes>
        {/* <Route path="/" element={<GuestLayout />} /> */}
        {user ? (
          <Route path="/" element={<UserLayout />} />
        ) : (
            <Route path="/" element={<GuestLayout />} />
        )}
      </Routes>
    </>
  );
};

export default App;
