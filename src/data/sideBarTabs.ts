import { MdDashboard, MdPeople } from "react-icons/md";

const sideBarTabs = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    initiallyOpened: false,
    link: "/dashboard",
  },
  {
    label: "Students",
    icon: MdPeople,
    initiallyOpened: false,
    link: undefined,
    links: [
      { icon: MdPeople, label: "List", link: "/students/list" },
      { icon: MdPeople, label: "Create Student", link: "/students/create" },
    ],
  },
];

export default sideBarTabs;
