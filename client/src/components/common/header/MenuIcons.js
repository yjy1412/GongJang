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
    color: #575f95;
    transition: .3s;
    &:hover {
      color: #f9796d;
    }
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

const MenuIcons = ({ onClick, handleModal, isLogin }) => {
  
  return (
    <MenuIconsBlock >
        <li className="search" onClick={onClick}>
            <FiSearch/>
        </li>
        <li>
            <Link 
            to={isLogin ? "/write" : "/"} 
            onClick={handleModal}
            ><FiEdit/>
            </Link>
        </li>
        <li>
            <Link 
            to={isLogin ? "/wishList" : "/"} 
            onClick={handleModal}
            ><FiHeart/></Link>
        </li>
        <li>
            <Link 
            to={isLogin ? "/mypage" : "/"} 
            onClick={handleModal}
            ><AiOutlineUser/>
            </Link>
        </li>
    </MenuIconsBlock>
  );
};

export default MenuIcons;