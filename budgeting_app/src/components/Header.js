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
  color: white;
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
      <HeaderNavi>
        <NaviIcon to="#">
          <MenuIcon/>
        </NaviIcon>
        <Total></Total>
        <Login></Login>
      </HeaderNavi>
  );
};
export default Header;