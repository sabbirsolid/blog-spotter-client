import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const DefaultLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="pt-14">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default DefaultLayout;
