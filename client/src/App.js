import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideBar, Header } from "components";
import {
  CreateProduct,
  ProductConfig,
  AdminConfig,
  CreateAdmin,
  Login,
} from "screens";
import { useStateContext } from "context/ContextProvider";

function App() {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <Router>
        <div className="flex relative">
          {activeMenu && window.location.pathname !== "/login" ? (
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
              activeMenu && window.location.pathname !== "/login"
                ? "md:ml-60"
                : "flex-2"
            } `}
          >
            {window.location.pathname !== "/login" && (
              <div className="navbar">
                <Header />
              </div>
            )}

            <div>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/createProduct" element={<CreateProduct />} />
                <Route path="/productConfig" element={<ProductConfig />} />
                <Route path="/adminConfig" element={<AdminConfig />} />
                <Route path="/createAdmin" element={<CreateAdmin />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
