import axios from "api/axios";
import { handleLogOut } from "util/HandleAuth";

const REFRESH = "/auth/refreshToken";

export const refreshToken = async (setAuth, nav) => {
  try {
    const response = await axios.get(REFRESH, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const prevUser = JSON.parse(localStorage.getItem("user")) || {};
    console.log(prevUser);
    console.log(response.data.accessToken);
    const updatedUser = {
      ...prevUser,
      accessToken: response.data.accessToken,
    };

    console.log("Updated USEr :: " + updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
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
