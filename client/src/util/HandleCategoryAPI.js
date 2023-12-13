import useAxiosPrivate from "hook/useAxiosPrivate";

const GET_ALL_CATE = "/categories/all";

export async function useGetCategory(accessToken) {
  const useAxios = useAxiosPrivate();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredential: true,
  };
  try {
    const response = await useAxios.get(GET_ALL_CATE, config);

    if (response.status === 200) {
      //const category = JSON.stringify(response);
      //console.log(response.data);
      return response.data;
      //return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
