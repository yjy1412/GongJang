import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiEdit, FiHeart } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';

const HeaderBlock = styled.header`
    width: 100%;
    height: 100px;
    background: salmon;
`;

const HeaderLayoutStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: salmon;
    .space {
        flex: 1;
    }
    .logo {
        flex: 1;
        background: greenyellow;
    }
    .menu-box {
        flex: 1;
        background: skyblue;
    }
`;

const Header = () => {
    return (
        <HeaderBlock>
            <HeaderLayoutStyle>
                <div className="space"></div>
                <div className="logo">
                    <Link to="/">
                        <p><span>공</span>유하는 <span>장</span>난감</p>
                    </Link> 
                </div>
                <div className="menu-box">
                    <ul className="auth">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/join">Join</Link>
                        </li>
                    </ul>
                    <ul className="menu-icons">
                        <li>
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
                    </ul>
                </div>
            </HeaderLayoutStyle>
        </HeaderBlock>
    );
};

export default Header;