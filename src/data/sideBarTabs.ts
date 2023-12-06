import { MdDashboard } from "react-icons/md";
import { IoIosConstruct } from "react-icons/io";

const sideBarTabs = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    initiallyOpened: false,
    link: "/dashboard",
  },
  {
    label: "Products",
    icon: IoIosConstruct,
    initiallyOpened: false,
    link: undefined,
    links: [
      { label: "List", link: "/products/list" },
      { label: "Create Product", link: "/products/create" },
    ],
  },
];

export default sideBarTabs;
