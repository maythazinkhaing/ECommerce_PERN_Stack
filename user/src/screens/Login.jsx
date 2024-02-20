import { useState, useEffect } from "react";
import { CustomInput } from "components";
import { Formik, Form } from "formik";
import { login } from "util/HandleAuth";
import * as yup from "yup";
import { useStateContext } from "context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";
import useCartAPI from "util/cartAPI";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { getCartItems } = useCartAPI();
  const { auth, setAuth, setCart } = useStateContext();

  const fetchCartAPI = async (id, accessToken) => {
    try {
      const cartItems = await getCartItems(id, accessToken);
      console.log("FROM LOG IN : " + cartItems);
      setCart(cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const loginSchema = yup.object({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (values, onSubmitProps) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    //log console
    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    //API
    const userData = await login(formData, setAuth);

    if (userData) {
      setAuth((data) => {
        return {
          ...data,
          user: userData,
        };
      });
      fetchCartAPI(userData.id, userData.accessToken);
      navigate("/home");
      localStorage.removeItem("cart");
    }

    onSubmitProps.resetForm();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (auth.user) {
      navigate("/home");
    }
  }, [auth.user]);

  return (
    <div className="login flex items-center justify-center flex-col">
      {isLoading && <Loading />}
      <div className="top-28 absolute">
        <h1 className="my-5 text-center uppercase tracking-widest font-bold">
          Login
        </h1>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ resetForm, values, onSubmitProps }) => {
              return (
                <Form className="grid gap-6 mt-5">
                  <CustomInput
                    label={"Username"}
                    name="username"
                    placeholder="Username"
                    type={"text"}
                  />
                  <CustomInput
                    label={"Password"}
                    name="password"
                    placeholder="Password"
                    type={"password"}
                  />
                  <button
                    className=" w-20 h-7 py-1 px-3 text-xs rounded-md my-2 uppercase text-white"
                    type="submit"
                  >
                    {" "}
                    login
                  </button>
                </Form>
              );
            }}
          </Formik>
          <div>
            <a className="text-xs text-amber-700 underline" href="/register">
              create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
