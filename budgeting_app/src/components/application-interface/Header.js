import * as React from 'react';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import Login from '../user/Login';
import Total from './Total';

const HeaderNavi = styled.div`
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

const TotalWrapper = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  color: white;
  padding-left: 11em;
`;
const Header = ({toggleSidebar, loggedIn, setLoggedIn, setIsSidebarOpen}) => {

    return (
      <HeaderNavi>
        <NaviIcon to="#" onClick={() => {
            if(loggedIn){
                toggleSidebar()
            }
        }}>
          <MenuIcon/>
        </NaviIcon>
          {loggedIn && (
        <TotalWrapper>
          <Total> </Total>
        </TotalWrapper>
          )}
        <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setIsSidebarOpen={setIsSidebarOpen}></Login>
      </HeaderNavi>
  );
};
export default Header;