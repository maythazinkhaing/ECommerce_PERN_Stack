import { PageHeader, Button } from "components";
import { PiPencilBold } from "react-icons/pi";
import { HiOutlineTrash } from "react-icons/hi";
//import useRefreshToken from "hook/useRefreshToken";

function ProductConfig() {
  //const refresh = useRefreshToken();
  return (
    <div className="body_container">
      <PageHeader title="Product Lists" />
      <hr />
      <Button name={"create"} to="/createProduct" />
      {/* <button onClick={() => refresh()}>Refresh</button> */}
      <table className="min-w-full text-left text-xs font-light items-center">
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
          <tr className="border-b dark:border-neutral-200">
            <td>1</td>
            <td className="items-center">
              <img
                src="https://tecdn.b-cdn.net/img/new/avatars/1.webp"
                className="w-16 rounded-lg shadow-lg"
                alt="Avatar"
              />
            </td>
            <td>Chocolate chip</td>
            <td>cookies</td>
            <td>7600</td>
            <td>active</td>
            <td>
              <div className="flex">
                <button className="text-md bg-blue-100 p-2 mx-1 rounded-lg">
                  <PiPencilBold />
                </button>
                <button className="text-md bg-red-200 p-2 mx-1 rounded-md">
                  <HiOutlineTrash />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductConfig;
