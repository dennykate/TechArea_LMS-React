import { useMemo } from "react";

const useSideBarTabs = () => {
  return useMemo(
    () => [
      {
        label: "ဒက်ရှ်ဘုတ်",
        icon: "material-symbols:dashboard-rounded",
        initiallyOpened: false,
        link: "/dashboard",
        permittedRoles: ["manager"],
      },
      {
        label: "စာရင်းချုပ်",
        icon: "ph:files-fill",
        initiallyOpened: false,
        link: "/accountant",
        permittedRoles: ["manager", "cashier"],
      },
      {
        label: "အရောင်းကောင်တာ",
        icon: "mdi:monitor-dashboard",
        initiallyOpened: false,
        link: "/sale",
        permittedRoles: ["cashier"],
      },
      {
        label: "ဘဏ္ဍာရေး",
        icon: "streamline:task-list-solid",
        initiallyOpened: false,
        link: undefined,
        permittedRoles: ["manager", "cashier"],
        links: [
          {
            label: "ရောင်းရငွေ",
            link: "/overviews/revenues",
            icon: "solar:money-bag-bold",
            permittedRoles: ["manager"],
          },
          {
            label: "အရောင်းမှတ်တမ်း",
            link: "/overviews/vouchers",
            icon: "mdi:voucher",
            permittedRoles: ["manager"],
          },
          {
            label: "စတော့",
            link: "/overviews/stocks",
            icon: "mingcute:truck-fill",
            permittedRoles: ["manager", "cashier"],
          },
        ],
      },
      {
        label: "စတင်ရန်",
        icon: "ant-design:control-filled",
        initiallyOpened: false,
        link: undefined,
        permittedRoles: ["manager"],
        links: [
          {
            label: "အမျိုးအစား",
            link: "/categories/list",
            icon: "material-symbols:category",
            links: [{ label: null, link: "/categories/create" }],
            permittedRoles: ["manager"],
          },
          {
            label: "ယူနစ်",
            icon: "material-symbols:conversion-path",
            link: "/units/list",
            links: [{ label: null, link: "/units/create" }],
            permittedRoles: ["manager"],
          },
          {
            label: "ပစ္စည်း",
            link: "/products/list",
            icon: "material-symbols:construction",
            links: [
              { label: null, link: "/products/create" },
              { label: null, link: "/products/detail/:id" },
            ],
            permittedRoles: ["manager"],
          },
          {
            label: "ပရိုမိုးရှင်း",
            link: "/promotions/list",
            icon: "bxs:discount",
            links: [{ label: null, link: "/promotions/create" }],
            permittedRoles: ["manager"],
          },
        ],
      },
      {
        label: "အကောင့်ထိန်းချုပ်မှု",
        icon: "fa-solid:users-cog",
        initiallyOpened: false,
        link: undefined,
        permittedRoles: ["manager"],
        links: [
          {
            label: "အက်ဒ်မင်",
            link: "/users/admin/list",
            permittedRoles: [""],
          },
          {
            label: "အရောင်းဝန်ထမ်း",
            link: "/users/cashier/list",
            permittedRoles: ["manager"],
          },
          {
            label: "မန်နေဂျာ",
            link: "/users/manager/list",
            permittedRoles: ["manager"],
          },
          {
            label: "အခြားဝန်ထမ်း",
            link: "/users/staff/list",
            permittedRoles: ["manager"],
          },
        ],
      },
      {
        label: "ထွက်ငွေစာရင်း",
        icon: "healthicons:money-bag",
        initiallyOpened: false,
        link: "/expenses/list",
        permittedRoles: ["manager", "cashier"],
      },
      {
        label: "အကြွေးစာရင်း",
        icon: "fluent:receipt-money-24-filled",
        initiallyOpened: false,
        link: "/debts/list",
        permittedRoles: ["manager", "cashier"],
      },
      {
        label: "ဝယ်သူစာရင်း",
        icon: "raphael:users",
        initiallyOpened: false,
        link: "/customers/list",
        permittedRoles: ["manager", "cashier"],
      },
      {
        label: "မှာယူမှုစာရင်း",
        icon: "material-symbols:order-approve",
        initiallyOpened: false,
        link: "/purchases/list",
        permittedRoles: ["manager", "cashier"],
      },
      {
        label: "ဆက်တင်",
        icon: "ant-design:setting-filled",
        initiallyOpened: false,
        link: "/app-settings",
        permittedRoles: ["admin"],
      },
    ],
    []
  );
};

export default useSideBarTabs;
