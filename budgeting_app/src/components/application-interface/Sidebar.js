import React from 'react';
import styled from '@emotion/styled';
import {SidebarData} from './SidebarData';
import Submenu from './SubMenu';

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
