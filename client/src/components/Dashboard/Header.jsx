import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiChevronsRight } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useStateContext } from "context/ContextProvider";
import { handleLogOut } from "util/HandleAuth";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const navigate = useNavigate;
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    auth,
    setAuth,
  } = useStateContext();
  ///const { username } = auth.user;
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logoutHandler = () => {
    handleLogOut();
    setAuth({
      user: null,
      isSuccess: false,
    });
    navigate("/login");
  };

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  return (
    <div className="item_center py-1 px-2">
      {activeMenu ? (
        <div></div>
      ) : (
        <button
          className="CO_Button"
          onClick={() => setActiveMenu((prev) => !prev)}
        >
          <FiChevronsRight />
        </button>
      )}

      <div className="flex item_center gap-2">
        <span className="text-lg p-4 hover:text-skyblue hover:cursor-pointer">
          <IoMdNotificationsOutline />
        </span>
        <Menu as="div">
          <Menu.Button className="text-xs font-bold tracking-widest px-3 py-3 text-skyblue  uppercase bg-skyblue/10 rounded-md">
            MT
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-3 mr-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-36">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <span
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-xs"
                      )}
                    >
                      MT
                    </span>
                  )}
                </Menu.Item>
                <form method="" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logoutHandler}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-xs"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
