//import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  CreateProduct,
  ProductConfig,
  AdminConfig,
  CreateAdmin,
  Login,
  CategoryConfig,
  Unthorizied,
} from "screens";
import { useStateContext } from "context/ContextProvider";
import ProtectedRoute from "PrivateRoute";
import SidebarLayout from "layout/SidebarLayout";
import NotFound from "screens/NotFound";

function App() {
  const { auth } = useStateContext();

  console.log(auth);
  const ROLE_LIST = {
    Admin: 3130,
    User: 2001,
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<SidebarLayout allowedRoles={[ROLE_LIST.Admin]} />}>
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
              path="/categoryConfig"
              element={
                <ProtectedRoute>
                  <CategoryConfig />
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
          <Route path="/unauthorized" element={<Unthorizied />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
