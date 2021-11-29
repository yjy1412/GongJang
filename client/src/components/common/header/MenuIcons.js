import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiEdit, FiHeart } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';

const MenuIconsBlock = styled.ul`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.7rem;
  li {
    height: 100%;
    display: flex;
    align-items: center;
    a {
      width: 100%;
      padding: 0 1.7rem 0.5rem;
      display: flex;
    }
  }
  .search {
    padding: 0 1.7rem 0.5rem;
    cursor: pointer;
  }
`;

const MenuIcons = ({ onClick }) => {
  return (
    <MenuIconsBlock >
      <li className="search" onClick={onClick}>
          <FiSearch/>
      </li>
      <li>
          <Link to="/write"><FiEdit/></Link>
      </li>
      <li>
          <Link to="wishList"><FiHeart/></Link>
      </li>
      <li>
          <Link to="mypage"><AiOutlineUser/></Link>
      </li>
  </MenuIconsBlock>
  );
};

export default MenuIcons;