import { MdDashboard, MdPeople } from "react-icons/md";

const sideBarTabs = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    initiallyOpened: false,
    link: "/dashboard",
  },
  {
    label: "Users",
    icon: MdPeople,
    initiallyOpened: false,
    link: undefined,
    links: [
      { label: "List", link: "/users/list" },
      
      { label: "Create User", link: "/users/create" },
    ],
  },
];

export default sideBarTabs;
