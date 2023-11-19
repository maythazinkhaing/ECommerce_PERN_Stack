import axios from "axios";

const url = "http://localhost:3001/categories";

export const getCategory = async (setCategory, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(`${url}/all`, config);

    setCategory(response.data);
  } catch (error) {
    console.log(error);
  }
};
