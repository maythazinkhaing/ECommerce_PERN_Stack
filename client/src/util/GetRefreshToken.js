import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getRefreshTokenFromCookie = () => {
  const refreshToken = cookies.get("jwt"); // Assuming the cookie name is "jwt"
  console.log(refreshToken + ":::::: From Cookie");
  return refreshToken;
};
