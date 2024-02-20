import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
//import { FaAngleDown } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import { TbShoppingBag } from "react-icons/tb";
import { CgMenuLeft } from "react-icons/cg";
import { Nav_links } from "../assets/constant";
import { useStateContext } from "../context/ContextProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogOut } from "util/HandleAuth";
import Loading from "./Loading";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdown, setIsDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const { cart, auth, setAuth, setCart } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const username = auth.user?.username;

  const logoutHandler = async () => {
    setIsLoading(true);
    await handleLogOut();
    setAuth({ user: null });
    setCart(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleLoginButton = () => {
    if (!auth.user) {
      navigate("/login");
    }
  };

  useEffect(() => {
    // Extract the last part of the pathname as the activeNav
    const activeNav = location.pathname.split("/").pop();
    setActiveNav(activeNav);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      // Close the dropdown on md screen
      if (window.innerWidth >= 768) {
        setIsDropdown(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalCartQty = (cart || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  useEffect(() => {
    // Initialize the cart based on local storage when the component mounts
    const cartDataString = localStorage.getItem("cart");
    const cartData = cartDataString ? JSON.parse(cartDataString) : { cart: [] };
    setCart(cartData.cart);
  }, [setCart]);
  return (
    <div className=" navbar_container ">
      {isLoading && <Loading />}
      <div
        className="flex items-center  md:hidden cursor-pointer"
        onClick={() => setIsDropdown(!isDropdown)}
      >
        <CgMenuLeft className="text-lg hover:text-deepBrown" />
      </div>
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className=" w-16" />
        <h3
          style={{ fontFamily: "Abril Fatfac" }}
          className="text-md hidden lg:block"
        >
          Minnie Bakery
        </h3>
      </div>
      {/* Dropdown */}
      <div className={`nav_dropdown ${isDropdown && "nav_dropdown_active"} `}>
        <ul className="flex flex-col md:flex-row gap-8 text-xs capitalize">
          {Nav_links.map((link) => (
            <li key={link.id}>
              <Link
                to={link.src}
                className={`nav-link ${
                  activeNav === link.name ? "text-deepBrown" : ""
                }`}
                onClick={() => setActiveNav(link.name)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* <li className="group relative cursor-pointer ">
            <h3 className="flex  items-center gap-1 ">
              Category
              <span>
                <FaAngleDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </h3>
            <div
              className={`nav_sub_dropdown ${
                isDropdown ? "nav_sub_dropdown_active" : "-left-9  py-4 "
              }`}
            >
              <div
                className={` hidden w-[150px] rounded-md bg-white border px-2  text-black group-hover:block ${
                  isDropdown && "border-none w-full"
                }`}
              >
                <ul className="space-y-2 py-2 ">
                  <li>Cake</li>
                  <li>About us</li>
                  <li>Privacy policy</li>
                </ul>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
      <div className=" flex relative gap-4 cursor-pointer">
        <div
          onClick={handleLoginButton}
          className="group flex gap-2 bg-deepBrown rounded-full px-3 py-2 md:px-4 md:py-1 text-white items-center hover:bg-Linen hover:text-deepBrown"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
        >
          <span>
            <RiUserLine className="text-xs text-center" />
          </span>

          <h3
            className=" hidden md:block uppercase text-center"
            style={{
              letterSpacing: "1.98px",
              fontSize: "11px",
              fontWeight: "200",
            }}
          >
            {auth.user ? username : "Login"}
          </h3>

          {auth.user && (
            <div
              className={`nav_sub_dropdown -left-[4.5rem] md:-left-8  py-4 top-5
      `}
            >
              <div
                className={` hidden w-[150px] rounded-md bg-white border px-2  text-black group-hover:block `}
              >
                <ul className="space-y-2 py-2 ">
                  <li>{auth.user ? username : "No User"}</li>

                  <li>
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <Link
          to={"/cart"}
          className="flex items-center cursor-pointer hover:text-deepBrown "
        >
          {totalCartQty !== 0 && (
            <span className="absolute -top-1 -right-[9px] ml-3 shadow-sm w-4 p-[3px] text-center rounded-full text-[9px] bg-deepBrown text-white">
              {totalCartQty}
            </span>
          )}
          <TbShoppingBag className="text-xl" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
