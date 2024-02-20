import { axiosPrivate } from "./axios";
import useRefreshToken from "hook/useRefreshToken";
import { useStateContext } from "context/ContextProvider";

const setupAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useStateContext();

  const accessToken = auth.user;

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

        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return () => {
    axiosPrivate.interceptors.request.eject(requestIntercept);
    axiosPrivate.interceptors.response.eject(responseIntercept);
  };
};

export const useAxiosPrivate = setupAxiosPrivate();

export default axiosPrivate;
