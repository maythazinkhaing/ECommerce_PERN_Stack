import { useState } from "react";
import { CgTrees } from "react-icons/cg";
import { FiChevronsLeft } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { links } from "../../data/dashLink";
import { NavLink } from "react-router-dom";
import { useStateContext } from "context/ContextProvider";

function SideBar() {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  //const [activeMenu, setActiveMenu] = useState(true);
  const [activeLink, setActiveLink] = useState(null);
  const [activeTitle, setActiveTitle] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSubMenu = (title) => {
    if (activeLink === title) {
      setActiveLink(null);
      setActiveTitle(null);
      setActiveSubMenu(null);
    } else {
      setActiveLink(title);
      setActiveTitle(title);
    }
  };

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="sideBar_container">
      {activeMenu && (
        <>
          <div className="item_center pb-5">
            <div className="item_center gap-2 text-skyblue text-md font-bold">
              <CgTrees className="text-xl" />
              <h1>Minnie's DB</h1>
            </div>
            <>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(false);
                }}
                className="CO_Button"
              >
                <FiChevronsLeft />
              </button>
            </>
          </div>
          <hr />
          <ul className="my-5">
            {links.map((link) => (
              <>
                <li key={link.title}>
                  {link.sub_menu ? (
                    <div
                      className={`link ${
                        activeTitle === link.title ? "text-skyblue" : ""
                      }`}
                      onClick={() => toggleSubMenu(link.title)}
                    >
                      <span className="text-sm"> {link.icon}</span>{" "}
                      <span className="flex-1">{link.title}</span>
                      <BsChevronDown
                        className={` ${
                          activeLink === link.title && "rotate-180"
                        }`}
                      />
                    </div>
                  ) : (
                    <NavLink
                      to={`/${link.title}`}
                      className={`link ${
                        activeTitle === link.title ? "text-skyblue" : ""
                      }`}
                      onClick={() => toggleSubMenu(link.title)}
                    >
                      <span className="text-sm"> {link.icon}</span>
                      <span className="flex-1">{link.title}</span>
                    </NavLink>
                  )}
                </li>
                {link.sub_menu && activeTitle === link.title && activeLink && (
                  <ul>
                    {link.sub_menu.map((subMenu, index) => (
                      <li key={subMenu.name}>
                        <NavLink
                          to={`/${subMenu.src}`}
                          className={`link sub_link ${
                            activeSubMenu === subMenu.name
                              ? "bg-lightblue/40 text-skyblue"
                              : "currentColor"
                          }`}
                          onClick={() => {
                            setActiveSubMenu(subMenu.name);
                            handleCloseSideBar();
                          }}
                        >
                          <span>{subMenu.icon}</span>
                          <span className="capitalize">{subMenu.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SideBar;
