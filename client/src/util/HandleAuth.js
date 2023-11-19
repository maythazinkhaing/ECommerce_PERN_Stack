import axios from "axios";

const url = "http://localhost:3001/auth";
//export const savedUser = JSON.parse(localStorage.getItem("user"));

export const login = async (formData, setAuth) => {
  try {
    console.log("LOGIN :" + formData);
    const response = await axios.post(`${url}/loginAdmin`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("From HandleAPI :" + response.data);
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

export const handleLogOut = (setAuth) => {
  localStorage.removeItem("user");
  setAuth({
    user: null,
    isSuccess: false,
  });
};
