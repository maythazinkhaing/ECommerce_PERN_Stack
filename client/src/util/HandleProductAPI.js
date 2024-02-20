import useAxiosPrivate from "hook/useAxiosPrivate";

const CREATE_PRODUCT = "/products/add";
const GET_ALL_PRODUCT = "/products/all";
const DEL_PRODUCT = "/products/del";
const PUT_PRODUCT = "/products/update";

//GET ALL PRODUCTS
const useProductAPI = (accessToken) => {
  const useAxios = useAxiosPrivate();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const getAllProduct = async (accessToken) => {
    const getConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    try {
      const response = await useAxios.get(GET_ALL_PRODUCT, getConfig);

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

  //CREATE PRODUCT
  const createProduct = async (formData, token) => {
    const createConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      const response = await useAxios.post(
        CREATE_PRODUCT,
        formData,
        createConfig
      );
      // console.log("DATA :", response.data);
      if (response.status === 200) {
        alert("Product added successfully");
      }
    } catch (error) {
      console.error("Axios error:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const updateProduct = async (id, formData, token) => {
    const updateConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };

    try {
      const response = await useAxios.put(
        `${PUT_PRODUCT}/${id}`,
        formData,
        updateConfig
      );

      if (response.status === 200) {
        console.log("Product Updated Successfully");
      }
    } catch (error) {
      console.error("Axios error:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const delProduct = async (id, accessToken) => {
    //const useAxios = useAxiosPrivate();
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   withCredentials: true,
    // };

    try {
      await useAxios.delete(`${DEL_PRODUCT}/${id}`, config);

      console.log("Delete Successful.");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllProduct,
    updateProduct,
    delProduct,
    createProduct,
  };
};

export default useProductAPI;
