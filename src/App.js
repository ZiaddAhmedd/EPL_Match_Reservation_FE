import { Route, Routes } from "react-router-dom";
import Footer from "./layouts/footer/Footer";
import NavBar from "./layouts/nav/NavBar";
import ForgetPasswordPage from "./pages/authentication/ForgetPasswordPage";
import HomePage from "./pages/home/homePage";
// import SubscribeCard from "./generic components/subscribe/SubscribeCard";
import NotFound from "./layouts/notFound/NotFound";
function App() {


  return (
    <>
      {/* <SubscribeCard open={open} setOpen={setOpen} /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forgetPassword/:id" element={<ForgetPasswordPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
