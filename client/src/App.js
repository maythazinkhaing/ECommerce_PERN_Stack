//import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  CreateProduct,
  ProductConfig,
  AdminConfig,
  CreateAdmin,
  Login,
} from "screens";
import { useStateContext } from "context/ContextProvider";
import ProtectedRoute from "PrivateRoute";
import SidebarLayout from "layout/SidebarLayout";
import NotFound from "screens/NotFound";
import UpdateProduct from "screens/Dashboard/UpdateProduct";

function App() {
  const { activeMenu, auth } = useStateContext();
  const r = auth.refreshToken;
  console.log(auth);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<SidebarLayout />}>
            <Route
              path="/createProduct"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/productConfig"
              element={
                <ProtectedRoute>
                  <ProductConfig />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminConfig"
              element={
                <ProtectedRoute>
                  <AdminConfig />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createAdmin"
              element={
                <ProtectedRoute>
                  <CreateAdmin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/updateProduct"
              element={
                <ProtectedRoute>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
