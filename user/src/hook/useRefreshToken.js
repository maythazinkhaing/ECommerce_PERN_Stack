import axios from "util/axios";
import { useStateContext } from "context/ContextProvider";
import { handleLogOut } from "util/HandleAuth";
import { useNavigate } from "react-router-dom";

const REFRESH = "/auth/refreshToken";
function useRefreshToken() {
  const { setAuth } = useStateContext();
  const nav = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get(REFRESH, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return {
          ...prev,
          user: { ...prev.user, accessToken: response.data.accessToken },
        };
      });
      return response.data.accessToken;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        alert(" your token has expired. Please Log in Again.");
        handleLogOut(setAuth);
        nav("/");
      }
      console.error("Error refreshing token:", error);
      throw error; // Propagate the error for further handling
    }
  };
  return refresh;
}

export default useRefreshToken;
