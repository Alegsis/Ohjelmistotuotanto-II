import * as React from 'react';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import Login from './Login';
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
  display: flex;
  justify-content: flex-start;
  color: white;
  padding-left: 4.5em;
`;

const Header = ({toggleSidebar}) => {

    return (
      <HeaderNavi>
        <NaviIcon to="#" onClick={toggleSidebar}>
          <MenuIcon/>
        </NaviIcon>
        <TotalWrapper>
          <Total></Total>
        </TotalWrapper>
        <Login></Login>
      </HeaderNavi>
  );
};
export default Header;