import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon />,
    iconClosed: <ExpandMoreIcon />,
    iconOpen: <ExpandLessIcon />,
    subNavi: [
      {
        title: "Categories",
        path: "/dashboard/categories",
        icon: <DriveFileMoveIcon />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transaction",
        icon: <ReceiptIcon />,
      },
    ],
  },
  {
    title: "Accounts",
    path: "/accounts",
    icon: <AccountBalanceIcon />,
  },
];
