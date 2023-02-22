import React from 'react';
import styled from '@emotion/styled';
import {SidebarData} from './SidebarData';
import Submenu from './SubMenu';
// import * as IconsMaterial from '@mui/icons-material/'; // malli importata kaikki ikonit
import Submenu from "./SubMenu";
import Login from "./Login";
import CreateBankAcc from "./CreateBankAcc";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";





const SidebarWrap = styled.nav`
  width: 100%;
`;

const Sidebar = () => {
  return (

      <SidebarWrap>
        {SidebarData.map((item, index) => {
          return <Submenu item={item} key={index}/>;
        })}
      </SidebarWrap>

  );
};

export default Sidebar;
