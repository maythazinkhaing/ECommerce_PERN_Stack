import axios from "./axios";

const GET_ALL_PRODUCT = "/products/all";
const GET_PRODUCT_DETAIL = "products/productsDetails";

export const getProducts = async () => {
  try {
    const response = await axios.get(GET_ALL_PRODUCT);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsDetails = async (ids) => {
  try {
    const response = await axios.get(`${GET_PRODUCT_DETAIL}/${ids}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
