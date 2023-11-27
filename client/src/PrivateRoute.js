// PrivateRoute.js
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "context/ContextProvider";
import Spinner from "components/Spinner";

function ProtectedRoute({ children }) {
  const { auth } = useStateContext();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (auth.user) {
      setToken(auth.user.accessToken);
    }
    setLoading(false);
  }, [auth.user]); // Only run the effect when auth.user changes

  if (loading) {
    return <Spinner />;
  }

  return auth.user ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
