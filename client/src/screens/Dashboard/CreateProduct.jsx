import React, { useEffect, useState } from "react";
import { PageHeader, CustomInput, CustomSelect, Button } from "components";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { getCategory } from "util/HandleCategoryAPI";
import CustomCheckBox from "components/CustomCheckBox";
import { createProduct } from "util/HandleProductAPI";
import { useStateContext } from "context/ContextProvider";

function CreateProduct() {
  const { auth } = useStateContext();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [category, setCategory] = useState([
    {
      category_id: "",
      category_name: "Select Category",
    },
  ]);

  const { accessToken } = auth.user;
  useEffect(() => {
    getCategory(setCategory, accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const productSchema = yup.object({
    product_name: yup.string().required("required"),
    description: yup.string().required("required"),
    price: yup.number().required("required"),
    qty_instock: yup
      .number("Please Enter Numbers.")
      .positive()
      .integer()
      .required("required"),
    status: yup.boolean(),
    feature: yup.boolean(),
    category: yup.string().required("required"),
    picture_path: yup.string().required("required"),
  });

  const initialValues = {
    product_name: "",
    description: "",
    price: "",
    qty_instock: "",
    status: false,
    feature: false,
    category: "",
    picture_path: "",
  };

  //POST
  const upload = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picture", selectedFileName);

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    //API CALL
    await createProduct(formData, accessToken);
    onSubmitProps.resetForm();
  };

  return (
    <div className="body_container">
      <PageHeader title="Create New Product" />
      <hr />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={upload}
        >
          {({ setFieldValue, errors, resetForm }) => {
            return (
              <Form className="grid gap-y-8 mx-auto mt-0 w-full py-5 md:grid-cols-2">
                <CustomInput
                  label="Prouct Name"
                  name="product_name"
                  type="text"
                  placeholder="Enter Product Name"
                />
                <CustomSelect
                  label="Category"
                  name="category"
                  placeholder="Select Product Category"
                >
                  <option value="">Select Category</option>
                  {category.map((cat) => {
                    return (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    );
                  })}
                </CustomSelect>
                <CustomInput
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                />
                <CustomInput
                  label="Price"
                  name="price"
                  type="text"
                  placeholder="Enter Price"
                />
                <CustomInput
                  label="Quantity"
                  name="qty_instock"
                  type="text"
                  placeholder="Enter Quantity"
                />
                <div className="input_div">
                  <label htmlFor="picture_path">Upload An Image</label>
                  <div
                    className="grid w-1/2"
                    style={{ gridTemplateRows: "1fr 0" }}
                  >
                    <input
                      className="border-none"
                      type="file"
                      name="picture_path"
                      onChange={(event) => {
                        const selectedFile = event.currentTarget.files[0];
                        if (selectedFile) {
                          setFieldValue("picture_path", selectedFile.name);
                          setSelectedFileName(selectedFile);
                        }
                      }}
                    />
                    {errors.picture_path && (
                      <span className="error capitalize">
                        {" "}
                        Choose An Image{" "}
                      </span>
                    )}
                  </div>
                </div>
                <CustomCheckBox label="Status" name="status" type="checkbox" />
                <CustomCheckBox
                  label="Is Featured?"
                  name="feature"
                  type="checkbox"
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

export default CreateProduct;
