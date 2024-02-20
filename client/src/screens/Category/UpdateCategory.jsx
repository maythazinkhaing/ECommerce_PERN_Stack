import { useState } from "react";
import { CustomInput, Button, PageHeader } from "components";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useStateContext } from "context/ContextProvider";
//import { updateCategory } from "util/HandleCategoryAPI";
import useCategoryAPI from "util/HandleCategoryAPI";
import Spinner from "components/Spinner";

function UpdateCategory({ onClose, data }) {
  const category_name = data.category_name;
  const category_id = data.category_id;
  const { auth } = useStateContext();
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken } = auth.user;
  const { updateCategory } = useCategoryAPI(accessToken);

  const categorySchema = yup.object({
    category_name: yup.string().required("required"),
  });

  const initialValues = {
    category_name: category_name,
  };

  const upload = async (values, onSubmitProps) => {
    setIsLoading(true);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    //API CALL
    console.log(accessToken);
    const response = await updateCategory(category_id, formData, accessToken);
    onSubmitProps.resetForm();
    setIsLoading(false);
    if (response === 200) {
      setSuccess(true);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isSuccess ? (
        <div>
          <h1 className="text-sm font-bold mb-3">Success!</h1>
          <hr />
          <h5 className="text-xs my-4">Successfully Updated The Category!</h5>
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

export default UpdateCategory;
