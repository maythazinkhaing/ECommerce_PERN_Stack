import { PageHeader } from "components";
import { useStateContext } from "context/ContextProvider";
import { useState, useEffect } from "react";
import useCategoryAPI from "util/HandleCategoryAPI";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Modal } from "components";
import { CreateCategory, UpdateCategory } from "screens";

const CategoryConfig = () => {
  const [categories, setCategories] = useState([]);

  const { auth } = useStateContext();
  const { accessToken } = auth.user;
  const [modals, setModals] = useState({
    create: { isOpen: false, data: null },
    edit: { isOpen: false, data: null },
    delete: { isOpen: false, data: null },
  });

  // const getCategory = useGetCategory(accessToken);
  const { getCategory, delCategory } = useCategoryAPI(accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategory();

        setCategories((prevCategories) => {
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

    fetchData();
  }, [accessToken, getCategory]);

  const toggleModals = (modalType, data = null) => {
    setModals((prev) => ({
      ...prev,
      [modalType]: { isOpen: !prev[modalType].isOpen, data },
    }));
  };

  const handleDelete = async () => {
    const id = modals.delete.data;
    if (id) {
      await delCategory(id, accessToken);
      toggleModals("delete");
    }
  };

  return (
    <div className="body_container">
      <PageHeader title={"Category Config"} />
      <hr />
      <div className="flex justify-end my-2">
        <button className=" button " onClick={() => toggleModals("create")}>
          Create
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.category_id}</td>
                  <td>{category.category_name}</td>
                  <td>
                    <div className="flex">
                      <button
                        className="text-lg text-skyblue  mx-1 hover:text-sky-500"
                        onClick={() => toggleModals("edit", category)}
                      >
                        <HiOutlinePencilAlt />
                      </button>
                      <button
                        className="text-lg mx-1 text-rose-500 hover:text-rose-700"
                        onClick={() =>
                          toggleModals("delete", category.category_id)
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

      {/* CREATE MODAL */}
      <Modal
        isOpen={modals.create.isOpen}
        onClose={() => toggleModals("create")}
      >
        <CreateCategory onClose={() => toggleModals("create")} />
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={modals.delete.isOpen}
        onClose={() => toggleModals("delete")}
      >
        <div className="flex justify-between text-md font-bold mb-4">
          <h2>DELETE</h2>
          <button
            className="hover:text-red-600"
            onClick={() => toggleModals("delete")}
          >
            <IoClose />
          </button>
        </div>

        <hr />
        <p className="text-sm my-4">Delete the category ?</p>
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

      {/* Edit MODAL */}
      <Modal isOpen={modals.edit.isOpen} onClose={() => toggleModals("edit")}>
        <UpdateCategory
          onClose={() => toggleModals("edit")}
          data={modals.edit.data}
        />
      </Modal>
    </div>
  );
};

export default CategoryConfig;
