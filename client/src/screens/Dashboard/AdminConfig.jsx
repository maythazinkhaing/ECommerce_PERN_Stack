import { PageHeader, Button } from "components";
// import { PiPencilBold } from "react-icons/pi";
// import { HiOutlineTrash } from "react-icons/hi";

function AdminConfig() {
  return (
    <div className="body_container">
      <PageHeader title="Admin Lists" />
      <hr />
      <Button name={"create"} to="/createAdmin" />
      <table className="min-w-full text-left text-xs font-light items-center table-auto">
        <thead className="border-b dark:border-neutral-200">
          <th>No.</th>
          <th>Email</th>
          <th>Username</th>
        </thead>
        <tbody>
          <tr className="border-b dark:border-neutral-200">
            <td>1</td>

            <td>admin@gmail.com</td>
            <td>admin</td>
            {/* <td>
              <div className="flex">
                <button className="text-md bg-blue-100 p-2 mx-1 rounded-lg">
                  <PiPencilBold />
                </button>
                <button className="text-md bg-red-200 p-2 mx-1 rounded-md">
                  <HiOutlineTrash />
                </button>
              </div>
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminConfig;
