import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateBankAcc from "./CreateBankAcc";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  margin-left: 10px;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    color: #a7c0cd;
  }
`;

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  border-left: 4px solid #15171c;

  &:hover {
    background: #252831;
    border-left: 4px solid #d380ff;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  height: 60px;
  padding-left: 3rem;
  background: #15171c;
  display: flex;
  text-decoration: none;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  border-left: 4px solid #15171c;

  &:hover {
    background: #252831;
    border-left: 4px solid #d380ff;
    cursor: pointer;
  }
`;

const Submenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNavi && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNavi && subnav
            ? item.iconOpen
            : item.subNavi
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNavi.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default Submenu;
