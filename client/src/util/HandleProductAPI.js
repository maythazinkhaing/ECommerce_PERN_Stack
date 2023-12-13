import axios from "api/axios";
import useAxiosPrivate from "hook/useAxiosPrivate";
import { redirect } from "react-router-dom";

const CREATE_PRODUCT = "/products/add";
const GET_ALL_PRODUCT = "/products/all";
const DEL_PRODUCT = "/products/del";
const PUT_PRODUCT = "/products/update";

export const createProduct = async (formData, token) => {
  //const useAxios = useAxiosPrivate();
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
    console.log(error.response.data.message);
  }
};

//GET ALL PRODUCTS
export const useGetAllProduct = async (accessToken) => {
  const useAxios = useAxiosPrivate();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredential: true,
  };
  try {
    const response = await useAxios.get(GET_ALL_PRODUCT, config);

    if (response.status === 200) {
      //const category = JSON.stringify(response);
      //console.log(response.data);
      return response.data;
      //return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, formData, accessToken) => {
  //const useAxios = useAxiosPrivate();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredential: true,
  };

  try {
    const response = await axios.put(`${PUT_PRODUCT}/${id}`, formData, config);

    if (response.status === 200) {
      console.log("Product Updated Successfully");
    } else {
      alert("Error updating product");
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const delProduct = async (id, accessToken) => {
  //const useAxios = useAxiosPrivate();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredential: true,
  };

  try {
    await axios.delete(`${DEL_PRODUCT}/${id}`, config);

    console.log("Delete Successful.");
  } catch (error) {
    console.log(error);
  }
};
