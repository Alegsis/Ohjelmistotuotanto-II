import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreateBankAcc from "./CreateBankAcc";
import Axios from "axios";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

const getUserAccounts = () => {
  const userID = localStorage.getItem("UserID");
  const baseUrl = `http://localhost:3001/account/${userID}`;
  const updatedArray = [];

  Axios.get(baseUrl)
    .then((res) => {
      for (let x = 0; x < res.data.length; x++) {
        const accountType = res.data[x].AccountType;
        let icon = null;
        switch (accountType) {
          case "Cash":
            icon = <AttachMoneyIcon />;
            break;
          case "Checking account":
            icon = <AccountBalanceIcon />;
            break;
          case "Savings account":
            icon = <SavingsIcon />;
            break;
          case "Credit Card":
            icon = <CreditCardIcon />;
            break;
          case "Loan":
            icon = <RequestQuoteIcon />;
            break;
          default:
            icon = null;
        }
        updatedArray.push({
          title: res.data[x].AccountName,
          path: `/accounts/${res.data[x].AccountName}`,
          icon: icon,
        });
      }
    })
    .catch((res) => {
      alert(res);
    });

  return updatedArray;
};

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
    subNavi: getUserAccounts(),
  },
  {
    title: "",
    icon: <CreateBankAcc />,
    path: "/",
  },
];
