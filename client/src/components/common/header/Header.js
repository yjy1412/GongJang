import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcons from './MenuIcons';
import Search from './Search';
import { fetchLogOut } from '../../../feature/userSlice';

const HeaderBlock = styled.header`
    width: 100%;
    height: 80px;
    margin: 1rem 0;
`;

const HeaderLayoutStyle = styled.div`
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #575F95;
    .space {
        flex: 1;
    }
    .logo {
        flex: 1;
        .logo-text {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            p {
            color: #c6c2c2;
            font-weight: 600;
            }
            span {
                color: #575F95;
                font-size: 2.5rem;
                font-weight: bold;
            }
        }
    }
    .menu-box {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
    
    const handleLogOut = () => {
        if(accessToken && isLogin){
            dispatch(fetchLogOut())
        }
        history.push('/');
    }
  
    return (
        <HeaderBlock>
            <HeaderLayoutStyle>
                <div className="space"></div>
                <div className="logo">
                    <Link to="/" className="logo-text">
                        <div>
                            <p><span>공</span> 유하는</p>
                        </div>
                        <div>
                            <p><span>장</span> 난감</p>
                         </div>
                    </Link> 
                </div>
                <MenuBoxBlock className="menu-box">
                    <ul className="auth">
                        <li>
                            { isLogin ? (
                                <Link to="/" onClick={() => handleLogOut()}>LOGOUT</Link>
                            ) : (
                                <Link to="/login">LOGIN</Link>
                            )}
                        </li>
                        <li>
                            <Link to="/join">JOIN</Link>
                        </li>
                    </ul>
                    <MenuIcons
                    onClick={onClick}
                    />
                </MenuBoxBlock>
                <div id="search-wrap">
                    <Search
                    onClick={onClick}
                    />
                </div>
            </HeaderLayoutStyle>
        </HeaderBlock>
    );
};

export default Header;