import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcons from './MenuIcons';
import Search from './Search';

const HeaderBlock = styled.header`
    position: relative;
    width: 100%;
    height: 80px;
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

const Header = () => {
    //Search 컴포넌트는 우선 transform으로 안보이게 위로 올려 둠
    return (
        <HeaderBlock>
            <HeaderLayoutStyle>
                <div className="space"></div>
                <div className="logo">
                    <Link to="/" className="logo-text">
                        <div>
                            <p><span>공</span>유하는</p>
                        </div>
                        <div>
                            <p><span>장</span>난감</p>
                         </div>
                    </Link> 
                </div>
                <MenuBoxBlock className="menu-box">
                    <ul className="auth">
                        <li>
                            <Link to="/login">LOGIN</Link>
                        </li>
                        <li>
                            <Link to="/join">JOIN</Link>
                        </li>
                    </ul>
                    <MenuIcons/>
                </MenuBoxBlock>
                <Search/>
            </HeaderLayoutStyle>
        </HeaderBlock>
    );
};

export default Header;