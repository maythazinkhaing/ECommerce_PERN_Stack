import { useEffect } from "react";
import { CustomInput, Button } from "components";
import { Formik, Form } from "formik";
import { login } from "util/HandleAuth";
import * as yup from "yup";
import { useStateContext } from "context/ContextProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { auth, setAuth } = useStateContext();
  const loginSchema = yup.object({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    //log console
    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    //API
    await login(formData, setAuth);

    onSubmitProps.resetForm();
  };

  useEffect(() => {
    if (auth.isSuccess || auth.user) {
      navigate("/productConfig");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user, auth.isSuccess]);

  return (
    <div className="login item_center justify-center flex-col">
      <div className="top-28 absolute">
        <h1 className="my-5 text-center uppercase tracking-widest font-bold">
          Login
        </h1>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(e, values, onSubmitProps) =>
              handleLogin(e, values, onSubmitProps)
            }
          >
            {({ resetForm, values, onSubmitProps }) => {
              return (
                <Form className="grid gap-6 my-5">
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
                  <Button name={"Login"} type="submit" />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
