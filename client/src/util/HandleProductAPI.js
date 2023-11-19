import axios from "axios";

const url = "http://localhost:3001/products";

export const createProduct = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log("form " + formData);
    const response = await axios.post(`${url}/add`, formData, config);
    console.log("DATA :" + response.data);
    if (response.status === 200) {
      alert("Product added successfully");
    } else {
      alert("Error adding product");
    }
  } catch (error) {
    console.log(error);
  }
};
