import { useState, useEffect } from "react";
import homeBG from "../assets/homeBG.png";

import { Loading } from "components";

function Home() {
  //const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   // Cleanup the timeout in case the component unmounts before the timeout is reached
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <div>
      {/* {isLoading && <Loading />} */}

      <div>
        <img src={homeBG} alt="bg" className=" w-[700px] absolute right-0" />
      </div>
      <div>
        <h1 className="home_header">Bite Into Baked Joy</h1>
        <p>Bread that’s the foundation of every great breakfast!</p>
      </div>
    </div>
  );
}

export default Home;
