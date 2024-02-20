import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Main = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="px-5 lg:px-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
