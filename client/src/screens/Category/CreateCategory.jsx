import { useState } from "react";
import { CustomInput, Button, PageHeader } from "components";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useStateContext } from "context/ContextProvider";
//import { createCategory } from "util/HandleCategoryAPI";
import useCategoryAPI from "util/HandleCategoryAPI";

function CreateCategory({ onClose }) {
  const { auth } = useStateContext();
  const [isSuccess, setSuccess] = useState(false);

  const { accessToken } = auth.user;

  const { createCategory } = useCategoryAPI(accessToken);

  const categorySchema = yup.object({
    category_name: yup.string().required("required"),
  });

  const initialValues = {
    category_name: "",
  };

  const upload = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    // API CALL
    const response = await createCategory(formData, accessToken);
    onSubmitProps.resetForm();

    if (response === 200) {
      setSuccess(true);
    }
  };

  return (
    <>
      {isSuccess ? (
        <div>
          <h1 className="text-sm font-bold mb-3">Success!</h1>
          <hr />
          <h5 className="text-xs my-4">Successfully Added New Category!</h5>
          <div className="flex justify-end my-2">
            <button className="button" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      ) : (
        <div className="body_container">
          <PageHeader title={"Create Category"} />
          <hr />
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={categorySchema}
              onSubmit={upload}
            >
              {({ props }) => {
                return (
                  <Form className="grid gap-y-8 mx-auto mt-0 w-full py-5 md:grid-cols-2">
                    <CustomInput
                      label={"Category Name"}
                      name="category_name"
                      type="text"
                      placeholder="Category Name"
                    />

                    <div className="input_div md:col-span-2 mt-9 gap-2 pl-10 md:justify-end ">
                      <button
                        className="button bg-gray-200 text-darkblue"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <Button name={"Save"} type="submit" />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateCategory;
