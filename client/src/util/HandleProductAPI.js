import axios from "axios";

const CREATE_PRODUCT = "/products/add";

export const createProduct = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredential: true,
  };
  try {
    console.log("form " + formData);
    const response = await axios.post(CREATE_PRODUCT, formData, config);
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
