import { Outlet, useLocation, Navigate } from "react-router-dom";
import { SideBar, Header } from "components";
import { useStateContext } from "context/ContextProvider";

const SidebarLayout = ({ allowedRoles }) => {
  const { activeMenu, auth } = useStateContext();
  const { role } = auth.user || {};
  //console.log(allowedRoles);
  const location = useLocation();
  return (
    <>
      {role?.find((role) => allowedRoles?.includes(role)) ? (
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
            className={`Header_Container ${
              activeMenu ? "md:ml-60" : "flex-2"
            } `}
          >
            <div className="navbar">
              <Header />
            </div>
            <Outlet />
          </div>
        </div>
      ) : auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default SidebarLayout;
