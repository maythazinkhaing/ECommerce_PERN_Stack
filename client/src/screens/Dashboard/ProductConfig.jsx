import React, { useEffect, useState } from "react";
import { PageHeader, Button } from "components";

import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useGetAllProduct, delProduct } from "util/HandleProductAPI";
import { useStateContext } from "context/ContextProvider";
import Modal from "components/Dashboard/Modal";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
//import useRefreshToken from "hook/useRefreshToken";

function ProductConfig() {
  const { auth } = useStateContext();
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productDetail, setProductDetail] = useState();

  const { accessToken } = auth.user;

  const getAllProduct = useGetAllProduct(accessToken);
  //const delProduct = useDelProduct();

  // const handleDelete = (id) => {
  //   delProduct(id, accessToken);
  //   setProduct(products.filter((product) => product.product_id !== id));
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProduct;
        console.log(data);

        // Use functional update to avoid infinite loop
        setProducts((prevProducts) => {
          // Only update if the new products are different
          if (JSON.stringify(prevProducts) !== JSON.stringify(data)) {
            return data;
          }
          return prevProducts;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken, getAllProduct]);

  const openModal = (id) => {
    setShowModal(true);
    setSelectedProductId(id);
    //console.log("Modal Opened");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  const openEditModal = (detail) => {
    setEditModal(true);
    setProductDetail(detail);
    console.log(detail);
    //console.log("Modal Opened");
  };

  const closeEditModal = () => {
    setEditModal(false);
    setProductDetail(null);
  };
  const handleDelete = async () => {
    if (selectedProductId) {
      await delProduct(selectedProductId, accessToken);
      setProducts(
        products.filter((product) => product.product_id !== selectedProductId)
      );
      closeModal();
    }
  };

  return (
    <div className="body_container" id="app">
      <PageHeader title="Product Lists" />
      <hr />
      <Button name={"create"} to="/createProduct" />
      {/* <button onClick={() => refresh()}>Refresh</button> */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs font-light items-center ">
          <thead className="border-b dark:border-neutral-200">
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => {
              return (
                <tr
                  className="border-b dark:border-neutral-200"
                  key={product.product_id}
                >
                  <td>{index}</td>
                  <td className="items-center">
                    <img
                      src={product.picture_path}
                      className="DB_Images"
                      alt={product.picture_path}
                    />
                  </td>
                  <td>{product.product_name}</td>
                  <td>{product.category_name}</td>
                  <td>{product.price}</td>

                  <td>
                    <div
                      className={`${
                        product.status ? "bg-emerald-100" : "bg-rose-200"
                      } text-center py-1  rounded-2xl px-3 xl:px-0`}
                      style={{ fontSize: "10px" }}
                    >
                      {product.status ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td>
                    <div className="flex">
                      <button
                        className="text-lg text-skyblue  mx-1 hover:text-sky-500"
                        onClick={() => openEditModal(product)}
                      >
                        <HiOutlinePencilAlt />
                      </button>
                      <button
                        className="text-lg mx-1 text-rose-500 hover:text-rose-700"
                        // onClick={() => handleDelete(product.product_id)}
                        onClick={() =>
                          openModal(product.product_id, setProducts)
                        }
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={closeModal}>
        <h2 className="text-md font-bold mb-4">DELETE</h2>
        <p className="text-sm  mb-4">Delete the product ?</p>
        <div className="flex justify-end ">
          <button
            className="w-20 h-7 py-1 px-3 text-xs rounded-md my-2 mx-1 uppercase bg-gray-200 "
            // onClick={() => handleDelete(product.product_id)}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="w-20 h-7 py-1 px-3 text-xs rounded-md my-2 mx-1 uppercase bg-skyblue text-white "
            // onClick={() => handleDelete(product.product_id)}
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </Modal>
      <Modal isOpen={editModal} onClose={closeEditModal}>
        <UpdateProduct data={productDetail} onClose={closeEditModal} />
      </Modal>
    </div>
  );
}

export default ProductConfig;
