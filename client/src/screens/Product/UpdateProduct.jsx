import React, { useEffect, useState, useRef } from "react";
import {
  PageHeader,
  CustomInput,
  CustomSelect,
  Button,
  CustomCheckBox,
  CustomTextArea,
} from "components";
import { Formik, Form } from "formik";
import * as yup from "yup";
//import { useGetCategory } from "util/HandleCategoryAPI";
//import { updateProduct } from "util/HandleProductAPI";
import useCategoryAPI from "util/HandleCategoryAPI";
import useProductAPI from "util/HandleProductAPI";
import { useStateContext } from "context/ContextProvider";
import Spinner from "components/Spinner";

function UpdateProduct({ data, setProducts, onClose }) {
  const { auth } = useStateContext();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [category, setCategory] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const { accessToken } = auth.user;
  const { updateProduct } = useProductAPI();
  const { getCategory } = useCategoryAPI(accessToken);

  const fetchCategory = async () => {
    try {
      const data = await getCategory();

      setCategory((prevCategories) => {
        // Only update if the new products are different
        if (JSON.stringify(prevCategories) !== JSON.stringify(data)) {
          return data;
        }
        return prevCategories;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line
  }, [category]);

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
    // picture_path: yup.string(),
  });

  const initialValues = {
    product_name: data.product_name,
    description: data.description,
    price: data.price,
    qty_instock: data.qty_instock,
    status: data.status,
    feature: data.isFeature,
    category: data.category_id,
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

    // setIsLoading(true);

    try {
      //API CALL
      const updatedProduct = await updateProduct(
        data.product_id,
        formData,
        accessToken
      );
      if (updatedProduct) {
        // Assuming setProducts is a function to update the products state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.product_id === updatedProduct.product_id
              ? updatedProduct
              : product
          )
        );
      }
      onSubmitProps.resetForm();

      //clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isSuccess ? (
        <div className="w-80">
          <h1 className="text-sm  mb-4 mt-4">Success!</h1>
          <hr />
          <h1 className="text-xs  mb-4 mt-4">
            The Product Is Successfully Updated!
          </h1>
          <div className="flex justify-end">
            <button
              className="w-20 h-7 py-1 px-3 text-xs rounded-md my-2 mx-1 uppercase bg-skyblue text-white "
              // onClick={() => handleDelete(product.product_id)}
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        <div className="body_container">
          <PageHeader title="Update Product" />
          <hr />
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={productSchema}
              onSubmit={upload}
            >
              {({ setFieldValue, errors }) => {
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
                      {category &&
                        category.length > 0 &&
                        category.map((cat) => {
                          return (
                            <option
                              key={cat.category_id}
                              value={cat.category_id}
                            >
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
                          ref={fileInputRef}
                        />

                        {errors.picture_path && (
                          <span className="error capitalize">
                            {" "}
                            {errors.picture_path}
                          </span>
                        )}
                      </div>
                    </div>
                    <CustomCheckBox
                      label="Status"
                      name="status"
                      type="checkbox"
                    />
                    <CustomCheckBox
                      label="Is Featured?"
                      name="feature"
                      type="checkbox"
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

export default UpdateProduct;
