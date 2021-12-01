import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FiSearch, FiEdit, FiHeart } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import AskLoginModal from '../../modal/AskLoginModal';

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

  const history = useHistory();

  const [visible, setVisible] = useState(false);

  const { isLogin } = useSelector( state => state.user);

  const handleModal = (e) => {
    if(!isLogin){
      setVisible(true);
    }
  }

  const onCancel = () => {
    setVisible(false);
  }

  const onConfirm = () => {
    setVisible(false);
    history.replace('/login')
  }

  return (
    <>
      <MenuIconsBlock >
        <li className="search" onClick={onClick}>
            <FiSearch/>
        </li>
        <li>
            <Link to={ isLogin ? "/write" : "/"} onClick={handleModal}><FiEdit/></Link>
        </li>
        <li>
            <Link to={ isLogin ? "wishList" : "/"} onClick={handleModal}><FiHeart/></Link>
        </li>
        <li>
            <Link to={ isLogin ? "mypage" : "/"} onClick={handleModal}><AiOutlineUser/></Link>
        </li>
    </MenuIconsBlock>
    {
      visible ? 
      <AskLoginModal onCancel={onCancel} visible={visible} onConfirm={onConfirm} /> :
      null
    }
  </>
  );
};

export default MenuIcons;