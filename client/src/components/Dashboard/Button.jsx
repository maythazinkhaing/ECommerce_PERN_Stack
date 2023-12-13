import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ name, to, bg }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };
  return (
    <button
      className={`${
        bg ? bg : " bg-skyblue text-white"
      } w-20 h-7 py-1 px-3 text-xs rounded-md my-2 mx-1 uppercase`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

export default Button;
