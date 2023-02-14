import React, { useState } from "react";
import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
// import * as IconsMaterial from '@mui/icons-material/'; // malli importata kaikki ikonit
import Submenu from "./SubMenu";
import Login from "./Login";
import CreateBankAcc from "./CreateBankAcc";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";



const SidebarNav = styled.nav`
  margin-top: 80px;
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.nav`
  width: 100%;
`;

const Sidebar = () => {
  return (
      <SidebarNav>
        <SidebarWrap>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
  );
};

export default Sidebar;
