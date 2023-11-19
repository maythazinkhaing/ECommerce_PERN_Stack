//import React, { useEffect, useState } from "react";
import { PageHeader, CustomInput, Button } from "components";
import { Formik, Form } from "formik";
import * as yup from "yup";

function CreateAdmin() {
  const adminSchema = yup.object({
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
    console.log(values);
  };

  return (
    <div className="body_container">
      <PageHeader title="Create Admin" />
      <hr />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={adminSchema}
          onSubmit={create}
        >
          {({ setFieldValue, errors, resetForm }) => {
            return (
              <Form className="grid gap-y-8 mx-auto mt-0 w-full py-5 md:grid-cols-2">
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
                  label="Passowrd"
                  name="passowrd"
                  type="text"
                  placeholder="Enter Passowrd"
                />

                <div className="input_div md:col-span-2 mt-9 gap-2 pl-10 md:justify-start ">
                  <Button name={"Back"} bg="bg-gray-200" type="button" />
                  <Button name={"Create"} type="submit" />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default CreateAdmin;
