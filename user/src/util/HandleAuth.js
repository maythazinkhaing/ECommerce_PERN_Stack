import axios from "./axios";

const REGISTER_URL = "/auth/registerUser";
const LOGIN_URL = "/auth/loginUser";
const LOGOUT_URL = "auth/logout";
const REFRESH = "/auth/refreshToken";
//export const savedUser = JSON.parse(localStorage.getItem("user"));

export const register = async (formData) => {
  try {
    const response = await axios.post(REGISTER_URL, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("RESPONSE" + response.data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
  }
};

export const login = async (formData) => {
  try {
    const response = await axios.post(LOGIN_URL, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));

      //  alert("login");

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

export const handleLogOut = async () => {
  try {
    const response = await axios.post(
      LOGOUT_URL,
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("user");
    console.log("LOGOUT RES :" + response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
