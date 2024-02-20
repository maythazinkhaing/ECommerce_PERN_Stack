import React, { useEffect, useState, useRef } from "react";
import {
  PageHeader,
  CustomInput,
  CustomSelect,
  Button,
  CustomTextArea,
} from "components";
import { Formik, Form } from "formik";
import * as yup from "yup";
//import { getCategory, useGetCategory } from "util/HandleCategoryAPI";
import CustomCheckBox from "components/CustomCheckBox";
import useProductAPI from "util/HandleProductAPI";
import { useStateContext } from "context/ContextProvider";
import useCategoryAPI from "util/HandleCategoryAPI";

function CreateProduct() {
  const { auth } = useStateContext();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [category, setCategory] = useState([]);
  const fileInputRef = useRef(null);
  const { accessToken } = auth.user;

  //const getCategory = useGetCategory(accessToken);
  const { getCategory } = useCategoryAPI(accessToken);
  const { createProduct } = useProductAPI(accessToken);

  const fetchCategory = async () => {
    try {
      const data = await getCategory();
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line
  }, []);

  const productSchema = yup.object({
    product_name: yup.string().required("required"),
    description: yup.string(),
    price: yup
      .number()
      .typeError("Price must be a valid number with no comma")
      .required("required"),
    qty_instock: yup
      .number("Please Enter Numbers.")
      .integer()
      .required("required"),
    status: yup.boolean(),
    feature: yup.boolean(),
    category: yup.string().required("required"),
    picture_path: yup
      .string()
      .required("required")
      .matches(
        /\.(png|jpg|jpeg)$/,
        "Invalid file. It Must be .png,.jpg or jpeg"
      ),
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
    // formData.append("picture", selectedFileName);
    formData.append("picture", selectedFileName);

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    try {
      //API CALL
      await createProduct(formData, accessToken);

      onSubmitProps.resetForm();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Error uploading product:", error);
    }
  };

  return (
    <div className="body_container">
      <PageHeader title="Create New Product" />
      <hr />
      <div>
        <Formik
          onSubmit={upload}
          initialValues={initialValues}
          validationSchema={productSchema}
        >
          {({ setFieldValue, errors, handleSubmit }) => (
            <Form
              className="grid gap-y-8 mx-auto mt-0 w-full py-5 md:grid-cols-2"
              onSubmit={handleSubmit}
            >
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
                {category &&
                  category.length > 0 &&
                  category.map((cat) => {
                    return (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    );
                  })}
              </CustomSelect>
              <CustomTextArea
                label="Description"
                name="description"
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
                    type="file"
                    name="picture_path"
                    onChange={(event) => {
                      const selectedFile = event.currentTarget.files[0];

                      if (selectedFile) {
                        setFieldValue("picture_path", selectedFile.name);
                        setSelectedFileName(selectedFile);
                      }
                    }}
                    ref={fileInputRef}
                  />

                  {errors.picture_path && (
                    <span className="error capitalize">
                      {" "}
                      {errors.picture_path}{" "}
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
                <button type="submit">Create</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateProduct;
