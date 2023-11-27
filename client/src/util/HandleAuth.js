import axios from "api/axios";

const LOGIN_URL = "/auth/loginAdmin";
const LOGOUT_URL = "auth/logout";
const REFRESH = "/auth/refreshToken";
//export const savedUser = JSON.parse(localStorage.getItem("user"));

export const login = async (formData, setAuth) => {
  try {
    const response = await axios.post(LOGIN_URL, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      setAuth((data) => {
        return {
          ...data,
          user: response.data,
          isSuccess: true,
        };
      });

      alert("login");

      return response.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
  }
};

export const refresh = async (setAuth) => {
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

export const handleLogOut = async (setAuth) => {
  try {
    const response = await axios.post(
      LOGOUT_URL,
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("user");
    setAuth({
      user: null,
      isSuccess: false,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
