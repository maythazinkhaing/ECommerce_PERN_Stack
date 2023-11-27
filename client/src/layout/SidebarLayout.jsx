import { Outlet } from "react-router-dom";
import { SideBar, Header } from "components";
import { useStateContext } from "context/ContextProvider";

const SidebarLayout = () => {
  const { activeMenu } = useStateContext();
  return (
    <>
      <div className="flex relative">
        {activeMenu ? (
          <div className="sideBar_on ">
            <SideBar />
          </div>
        ) : (
          <div className="sideBar_off">
            <SideBar />
          </div>
        )}
        <div
          className={`Header_Container ${activeMenu ? "md:ml-60" : "flex-2"} `}
        >
          <div className="navbar">
            <Header />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
