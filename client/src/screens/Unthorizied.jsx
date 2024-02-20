import React from "react";
import { handleLogOut } from "util/HandleAuth";
import { useStateContext } from "context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Unthorizied = () => {
  const { setAuth } = useStateContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    handleLogOut();
    setAuth({ user: null });
    navigate(-1);
  };
  return (
    <div className="login item_center justify-center">
      <div className="bg-white shadow-md text-left p-5 top-28 absolute min-w-96">
        <h1 className="text-sm mb-5">Unauthorized!</h1>
        <hr />
        <p className="text-xs my-5">You don't have access to the admin page.</p>
        <button className="button " onClick={handleLogout}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Unthorizied;
