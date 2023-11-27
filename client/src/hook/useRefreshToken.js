import axios from "api/axios";
import { useStateContext } from "context/ContextProvider";
const REFRESH = "/auth/refreshToken";
function useRefreshToken() {
  const { auth, setAuth } = useStateContext();

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
      console.error("Error refreshing token:", error);
      throw error; // Propagate the error for further handling
    }
  };
  return refresh;
}

export default useRefreshToken;
