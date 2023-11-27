import axios from "api/axios";
//import useAxiosPrivate from "hook/UseAxiosPrivate";

const GET_ALL_CATE = "/categories/all";

export const getCategory = async (setCategory, accessToken) => {
  //const axiosPrivate = useAxiosPrivate();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredential: true,
  };
  try {
    const response = await axios.get(GET_ALL_CATE, config);

    if (response.status === 200) {
      //setCategory(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
