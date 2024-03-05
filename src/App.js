
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// pages
import GuestLayout from "./layout/GuestLayout";
import UserLayout from "./layout/UserLayout";
import Loading from "./components/states/Loading";
import NotFound from "./components/states/NotFound";

const App = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <>
      <Loading />
      <Routes>
        <Route path="*" element={<NotFound />} />
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
