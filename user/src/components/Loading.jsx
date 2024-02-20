import React from "react";
import Lottie from "lottie-react";
import loading from "../assets/loading.json";

const Loading = () => {
  return (
    <div className="loading">
      <Lottie animationData={loading} loop autoplay className="max-w-[32rem]" />
      {/* <h2 className="text-xs tracking-[0.5rem] font-medium">Loading...</h2> */}
    </div>
  );
};

export default Loading;
