import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit, FiHeart } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const SidebarBlock = styled.div`
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  pointer-events: none;
  .sidebar-bg {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity .5s;
  }
  .sidebar-bg.open {
    opacity: 1;
    pointer-events: auto;
    cursor: pointer;
  }
  .sidebar-menu {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 255px;
    max-width: 100%;
    padding-left: 30px;
    padding-top: 30px;
    background: #fff2df;
    transform: translateX(100%);
    transition: transform .5s cubic-bezier(.4, 0, .6, 1);
    li {
      border-bottom: 1px solid rgba(221,226,229,.5);
      cursor: pointer;
      a {
        display: block;
        padding: 1rem 0;
        font-size: 1.2rem;
      }
    }
    .close-hidden-menu {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
      cursor: pointer;
    }
  }
  .sidebar-menu.open {
    pointer-events: auto;
    transform: translateX(0);
    transition: transform .5s cubic-bezier(0,0,.2,1)
  }
`;

const Sidebar = ({ open, onClickHiddenMenu, isLogin, handleLogOut }) => {
  
  return (
    <SidebarBlock>
      <div 
      className={open ? "sidebar-bg open" : "sidebar-bg"}
      onClick={onClickHiddenMenu}
      ></div>
      <ul className={open ? "sidebar-menu open" : "sidebar-menu"}>
        <li>
        { isLogin ? (
            <Link 
            to="/" 
            onClick={handleLogOut}
            >LOGOUT</Link>
        ) : (
            <Link to="/login" onClick={onClickHiddenMenu}>LOGIN</Link>
        )}
        </li>
        <li>
        { !isLogin &&                                 
            <Link to="/join" onClick={onClickHiddenMenu}>JOIN</Link>
        }
        </li>
        <li>
          <Link to="/" onClick={onClickHiddenMenu}>나눔글 목록</Link>
        </li>
        <li>
            <Link 
            to={isLogin ? "/write" : "/login"} 
            onClick={onClickHiddenMenu}
            ><FiEdit/>
            </Link>
        </li>
        <li>
            <Link 
            to={isLogin ? "/wishList" : "/login"} 
            onClick={onClickHiddenMenu}
            ><FiHeart/>
            </Link>
        </li>
        <li>
            <Link 
            to={isLogin ? "/mypage" : "/login"} 
            onClick={onClickHiddenMenu}
            ><AiOutlineUser/>
            </Link>
        </li>
        <div className="close-hidden-menu" onClick={onClickHiddenMenu}>
          <FaTimes/>
        </div>
      </ul>
    </SidebarBlock>
  );
};

export default Sidebar;