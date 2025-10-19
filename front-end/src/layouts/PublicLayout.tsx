import { Outlet } from "react-router-dom";
// import ThemeButton from "../components/common/ThemeButton"
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      
        <Outlet />

      <Footer/>
    </div>
  );
}
