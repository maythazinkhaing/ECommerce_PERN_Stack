import {
  //AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  //AiOutlineStock,
} from "react-icons/ai";
import { FiPieChart } from "react-icons/fi";
import {
  // BsKanban,
  BsBarChart,
  // BsInboxesFill,
  // BsCurrencyDollar,
  // BsShield,
  // BsChatLeft,
} from "react-icons/bs";
import { MdAllInbox } from "react-icons/md";
import { PiChartLineUpFill } from "react-icons/pi";
import { RiUserSettingsLine, RiStockLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
//import { HiOutlineRefresh } from "react-icons/hi";
import { TbShoppingCartStar, TbClipboardList } from "react-icons/tb";
import { GiLouvrePyramid } from "react-icons/gi";
import { CgUserList } from "react-icons/cg";

export const links = [
  {
    id: 1,
    title: "Dashboard",
    icon: <PiChartLineUpFill />,
  },

  {
    id: 2,
    title: "Product Mangement",
    icon: <MdAllInbox />,
    sub_menu: [
      {
        id: 1,
        name: "product Config",
        icon: <TbClipboardList />,
        src: "productConfig",
      },
      {
        id: 2,
        name: "product category",
        icon: <AiOutlineShoppingCart />,
        src: "categoryConfig",
      },
    ],
  },
  {
    id: 3,
    title: "orders",
    icon: <TbShoppingCartStar />,
  },
  {
    id: 4,
    title: "Customer Lists",
    icon: <CgUserList />,
  },
  {
    id: 5,
    title: "User Management",
    icon: <RiUserSettingsLine />,
    sub_menu: [
      {
        id: 1,
        name: "Admin Config",
        src: "adminConfig",
        icon: <MdAdminPanelSettings />,
      },
      {
        id: 2,
        name: "area",
        icon: <AiOutlineAreaChart />,
      },

      {
        id: 3,
        name: "bar",
        icon: <AiOutlineBarChart />,
      },
      {
        id: 4,
        name: "pie",
        icon: <FiPieChart />,
      },
      {
        id: 5,
        name: "financial",
        icon: <RiStockLine />,
      },
      {
        id: 5,
        name: "color-mapping",
        icon: <BsBarChart />,
      },
      {
        id: 7,
        name: "pyramid",
        icon: <GiLouvrePyramid />,
      },
      {
        id: 8,
        name: "stacked",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];
