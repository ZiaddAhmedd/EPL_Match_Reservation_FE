import { Route, Routes } from "react-router-dom";
import Footer from "./layouts/footer/Footer";
import NavBar from "./layouts/nav/NavBar";
import ForgetPasswordPage from "./pages/authentication/ForgetPasswordPage";

// import SubscribeCard from "./generic components/subscribe/SubscribeCard";
import NotFound from "./layouts/notFound/NotFound";
import Home from "./pages/home/homePage";
import Manager from "./pages/manager/managerPage";
// import Fan from "./pages/fan/fanPage";
import AddMatch from "./pages/manager/addMatch";
import AddStadium from "./pages/manager/addStadium";
import Admin from "./pages/admin/adminPage";

function App() {


  return (
    <>
      {/* <SubscribeCard open={open} setOpen={setOpen} /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/manager" element={<Manager />} exact></Route>
        <Route path="/manager/addmatch" element={<AddMatch />} exact></Route>
        <Route path="/manager/addstadium" element={<AddStadium />} exact></Route>
        {/* <Route path="/Fan" element={<Fan />} exact></Route> */}
        <Route path="/forgetPassword/:id" element={<ForgetPasswordPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
