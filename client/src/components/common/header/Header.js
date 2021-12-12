import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcons from './MenuIcons';
import Search from './Search';
import { fetchLogOut } from '../../../feature/userSlice';
import AskModal from '../../modal/AskModal';
import { CgMenuCheese } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Logo from '../../../style/images/logo.png';

const HeaderBlock = styled.header`
    width: 100%;
    height: 100px;
`;

const HeaderLayoutStyle = styled.div`
    width: 70%;
    height: 100%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #575F95;
    .space {
        flex: 1;
    }
    .logo {
        flex: 1;
        height: 100%;
        .logo-box {
            height: 100%;
            display: flex;
            justify-content: center;
        }
    }
    .menu-box {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .hidden-menu {
        display: none;
        cursor: pointer;
        flex: 1;
        svg {
            font-size: 2rem;
        }
    }
    #search-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        background: #dadcec;
        transform: translateY(-120%);
        transition: transform .4s;
        z-index: 10;
    }
    @media only screen and (max-width: 1200px){
        width: 100%;
        margin: 0;
        padding: 1rem 2rem;
        .space {
            display: none;
        }
        .logo .logo-box {
            justify-content: flex-start;
        }
    }
    @media only screen and (max-width: 1024px){
        .menu-box {
            display: none;
        }
        .hidden-menu {
            display: flex;
            justify-content: flex-end;
        }
    }
    @media only screen and (max-width: 768px){
        padding: 1rem;
    }
`;

const MenuBoxBlock = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .auth {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        font-size: 0.9rem;
        li {
            display: flex;
            a {
               padding: 0.5rem 1.5rem 0;
            }
        }
    }
`;

const Header = () => {const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const { isLogin, accessToken } = useSelector((state) => state.user);
    
    const onClick = () => {
        setShow(!show)
        const searchWrap = document.querySelector('#search-wrap');
        if(!show){
            searchWrap.style.transform = 'translateY(0%)';
        } else {
            searchWrap.style.transform = 'translateY(-120%)';
            searchWrap.style.transition = 'transform .4s';
        }
    };

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
        history.push('/login')
    }
    
    const handleLogOut = async () => {
        if(accessToken && isLogin){
            await dispatch(fetchLogOut());
            setOpen(!open);
        }
        if(!isLogin){
            history.push('/');
        }
    } 
    
    const onClickHiddenMenu = () => {
        setOpen(!open);
    }

    return (
        <>
            <HeaderBlock>
                <HeaderLayoutStyle>
                    <div className="space"></div>
                    <div className="logo">
                        <Link to="/" className="logo-box">
                            <img src={Logo} alt="로고" />
                        </Link> 
                    </div>
                    <MenuBoxBlock className="menu-box">
                        <ul className="auth">
                            <li>
                                { isLogin ? (
                                    <Link to="/" onClick={handleLogOut}>LOGOUT</Link>
                                ) : (
                                    <Link to="/login">LOGIN</Link>
                                )}
                            </li>
                            <li>
                                { !isLogin &&                                 
                                    <Link to="/join">JOIN</Link>
                                }
                            </li>
                        </ul>
                        <MenuIcons
                        onClick={onClick}
                        handleModal={handleModal}
                        isLogin={isLogin}
                        />
                    </MenuBoxBlock>
                    <div className="hidden-menu">
                        <FiSearch 
                        style={{marginRight: '0.5rem'}}
                        onClick={onClick}
                        />
                        <CgMenuCheese onClick={onClickHiddenMenu}/>
                    </div>
                    <div id="search-wrap">
                        <Search
                        onClick={onClick}
                        />
                    </div>
                </HeaderLayoutStyle>
                <Sidebar 
                open={open}
                isLogin={isLogin}
                onClickHiddenMenu={onClickHiddenMenu}
                handleLogOut={handleLogOut}
                />
            </HeaderBlock>
            { visible && (
                <AskModal 
                visible={visible}
                title='알림'
                description='로그인이 필요한 서비스입니다.'
                addDescription='로그인 하시겠습니까?'
                onConfirm={onConfirm}
                onCancel={onCancel} 
                /> 
            )}
        </>
    );
};

export default Header;