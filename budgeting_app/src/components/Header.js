import * as React from 'react';
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



const TopbarNav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NaviIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
`;

/*
const [sidebar, setSidebar] = React.useState(false);
const showSidebar = () =>  {
    setSidebar(!sidebar);
}
*/

const Header = () => {
    return (
    <TopbarNav>
        <NaviIcon to="#">
            <MenuIcon/>
        </NaviIcon>
        <Login></Login>
    </TopbarNav>
    )
}
export default Header;