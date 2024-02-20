import React, { useEffect, useState } from "react";
import { PageHeader, Button } from "components";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
//import { useGetAllProduct, delProduct } from "util/HandleProductAPI";
import useProductAPI from "util/HandleProductAPI";
import { useStateContext } from "context/ContextProvider";
import Modal from "components/Dashboard/Modal";
import UpdateProduct from "./UpdateProduct";

function ProductConfig() {
  const { auth } = useStateContext();
  const [products, setProducts] = useState([]);
  const [modals, setModals] = useState({
    delete: { isOpen: false, data: null },
    edit: { isOpen: false, data: null },
    // Add more modals as needed
  });

  const { accessToken } = auth.user;

  const { getAllProduct, delProduct } = useProductAPI(accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProduct(accessToken);

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
    // eslint-disable-next-line
  }, [products, modals]);

  const toggleModal = (modalType, data = null) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalType]: { isOpen: !prevModals[modalType].isOpen, data },
    }));
  };

  const handleDelete = async () => {
    const id = modals.delete.data;
    if (id) {
      await delProduct(id, accessToken);

      // Update the state after deletion
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.product_id !== id)
      );

      toggleModal("delete");
    }
  };

  return (
    <div className="body_container">
      <PageHeader title="Product Lists" />
      <hr />
      <div className="flex justify-end my-2">
        <Button name={"create"} to="/createProduct" />
      </div>

      {/* <button onClick={() => refresh(setAuth, nav)}>Refresh</button> */}
      <div className="overflow-x-auto">
        <table className="table ">
          <thead>
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
                        onClick={() => toggleModal("edit", product)}
                      >
                        <HiOutlinePencilAlt />
                      </button>
                      <button
                        className="text-lg mx-1 text-rose-500 hover:text-rose-700"
                        // onClick={() => handleDelete(product.product_id)}
                        onClick={() =>
                          toggleModal("delete", product.product_id)
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
      <Modal
        isOpen={modals.delete.isOpen}
        onClose={() => toggleModal("delete")}
      >
        <div className="flex justify-between text-md font-bold mb-4">
          <h2>DELETE</h2>
          <button
            className="hover:text-red-600"
            onClick={() => toggleModal("delete")}
          >
            <IoClose />
          </button>
        </div>

        <hr />
        <p className="text-sm my-4">Delete the product ?</p>
        <div className="flex justify-end ">
          <button
            className="button "
            // onClick={() => handleDelete(product.product_id)}
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </Modal>
      <Modal isOpen={modals.edit.isOpen} onClose={() => toggleModal("edit")}>
        <UpdateProduct
          data={modals.edit.data}
          onClose={() => toggleModal("edit")}
        />
      </Modal>
    </div>
  );
}

export default ProductConfig;
