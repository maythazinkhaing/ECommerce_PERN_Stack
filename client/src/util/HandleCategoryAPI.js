import useAxiosPrivate from "hook/useAxiosPrivate";
//import axios from "api/axios";

const GET_ALL_CATE = "/categories/all";
const CREATE_CATE = "/categories/add";
const DEL_CATE = "/categories/del";
const PUT_CATE = "/categories/update";

// export const getCategory = async (accessToken) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//     withCredentials: true,
//   };

//   try {
//     const response = await axiosPrivate.get(GET_ALL_CATE, config);

//     if (response && response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Unexpected response status");
//     }
//   } catch (error) {
//     if (error.response) {
//       console.log("CATEGORY ERROR: " + error.response);
//     } else {
//       console.log("Error making category API call:" + error);
//     }
//   }
// };

// export async function useGetCategory(accessToken) {
//   const useAxios = useAxiosPrivate();

//   const config = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//     withCredentials: true,
//   };
//   //console.log("Raw Access Token:", accessToken);

//   try {
//     const response = await useAxios.get(GET_ALL_CATE, config);

//     if (response && response.status === 200) {
//       return response.data;
//     }
//   } catch (error) {
//     if (error.response) {
//       console.log("CATEGORY ERROR: " + error.response.status);
//     } else {
//       console.log("Error making category API call:" + error);
//     }
//   }
// }

// export const createCategory = async (formData, token) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     withCredentials: true,
//   };
//   try {
//     // console.log("Handle :: " + formData);
//     const response = await axios.post(CREATE_CATE, formData, config);
//     // console.log("CATEGORY :" + response.data);
//     if (response.status === 200) {
//       return 200;
//     } else {
//       alert("Error adding category");
//     }
//   } catch (error) {
//     console.log(error.response);
//   }
// };

// export const updateCategory = async (id, formData, token) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     withCredentials: true,
//   };
//   try {
//     const response = await axios.put(`${PUT_CATE}/${id}`, formData, config);

//     if (response.status === 200) {
//       return 200;
//     } else {
//       alert("Error updating category");
//     }
//   } catch (error) {
//     console.log(error.response);
//   }
// };

// export const delCategory = async (id, accessToken) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     withCredentials: true,
//   };
//   try {
//     const response = await axios.delete(`${DEL_CATE}/${id}`, config);
//     console.log("DEL respones : " + response);
//     console.log("Delete Successful.");
//   } catch (error) {
//     console.log(error);
//   }
// };

const useCategoryAPI = (accessToken) => {
  const useAxios = useAxiosPrivate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  //console.log("Raw Access Token:", accessToken);

  const getCategory = async () => {
    try {
      const response = await useAxios.get(GET_ALL_CATE, config);

      if (response && response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.log("CATEGORY ERROR: " + error.response.status);
      } else {
        console.log("Error making category API call:" + error);
      }
    }
  };

  const createCategory = async (formData, token) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   withCredentials: true,
    // };
    try {
      // console.log("Handle :: " + formData);
      const response = await useAxios.post(CREATE_CATE, formData, config);
      // console.log("CATEGORY :" + response.data);
      if (response.status === 200) {
        return 200;
      } else {
        alert("Error adding category");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const updateCategory = async (id, formData, token) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   withCredentials: true,
    // };
    try {
      const response = await useAxios.put(
        `${PUT_CATE}/${id}`,
        formData,
        config
      );

      if (response.status === 200) {
        return 200;
      } else {
        alert("Error updating category");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const delCategory = async (id, accessToken) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   withCredentials: true,
    // };
    try {
      const response = await useAxios.delete(`${DEL_CATE}/${id}`, config);
      console.log("DEL respones : " + response);
      console.log("Delete Successful.");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getCategory,
    createCategory,
    updateCategory,
    delCategory,
  };
};

export default useCategoryAPI;
