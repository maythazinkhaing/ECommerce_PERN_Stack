import { axiosPrivate } from "api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useStateContext } from "context/ContextProvider";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useStateContext();

  const accessToken = auth.user;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          //console.log("New Access Token:", newAccessToken);

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          //console.log("Updated Request:", prevRequest);

          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
export default useAxiosPrivate;
