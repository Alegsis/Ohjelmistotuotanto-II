import React, {useEffect} from 'react';
import styled from '@emotion/styled';
import {SidebarData, getUserAccounts} from './SidebarData';
import Submenu from './SubMenu';

const SidebarWrap = styled.nav`
  width: 100%;
`;

const Sidebar = ({loggedIn}) => {
    useEffect(() => {
        if (loggedIn){
           SidebarData[1].subNavi = getUserAccounts()
        }
    },[loggedIn])
  return (
      <SidebarWrap>
        {SidebarData.map((item, index) => {
          return <Submenu item={item} key={index}/>;
        })}
      </SidebarWrap>
  );
};

export default Sidebar;
