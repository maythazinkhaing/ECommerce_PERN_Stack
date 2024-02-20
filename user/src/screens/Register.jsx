import { useState, useEffect } from "react";
import { CustomInput, Loading } from "components";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { register } from "util/HandleAuth";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "context/ContextProvider";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useStateContext();
  const navigate = useNavigate();

  const userSchema = yup.object({
    email: yup.string().email("Invalid Email").required("required"),
    username: yup.string().required("required"),
    password: yup.string().required("required"),
  });

  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const create = async (values, onSubmitProps) => {
    // console.log(values);
    setIsLoading(true);
    try {
      const userData = await register(values);
      console.log("USER DATA :: ", userData);
      if (userData) {
        alert("Successfully Created An Account!");
        navigate("/login");
      }
      onSubmitProps.resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
          create an account
        </h1>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={create}
          >
            {({ setFieldValue, errors, resetForm }) => {
              return (
                <Form className="grid gap-6 my-5">
                  <CustomInput
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Enter Email"
                  />

                  <CustomInput
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter Username"
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
                    Register
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
