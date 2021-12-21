import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Join from './pages/Join';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import PostDetail from './pages/PostDetail';
import UpdatePassword from './pages/UpdatePassword';
import WishList from './pages/WishList';
import Write from './pages/Write';
import Header from './components/common/header/Header';
import Footer from './components/common/Footer';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const TopBtnStyle = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  margin-bottom: 3%;
  margin-right: 3%;
  width: 50px;
  height: 50px;
  z-index: -10;
  opacity: 0;
  display: flex;
  align-items: center;
  text-align: center;
  background: rgba(252, 152, 141,0.3);
  cursor: pointer;
  transition: opacity .3s;
  span {
    width: 100%;
  }
  &.active {
    z-index: 10;
    opacity: 1;
  }
`;

function App() {
  const { accessToken } = useSelector( state => state.user);
  axios.defaults.headers.common['authorization'] = `${accessToken ? `Bearer ${accessToken}` : ''}`;

  const [windowScrollY, setWindowScrollY] = useState(0);
  const [btnState, setBtnState] = useState(false);

  const onScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setWindowScrollY(0);
    setBtnState(false);
  }

  useEffect(() => {
    const scrollHandle = () => {
      setWindowScrollY(window.scrollY);
      if(windowScrollY > 100){
        setBtnState(true);
      } else {
        setBtnState(false);
      }
    }
    const move = () => {
      window.addEventListener('scroll', scrollHandle);
    }
    move();
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    }
  },[windowScrollY])

  return (
    <>
      <Header/>
      <Switch>
        <Route component={Main} exact path="/"/>
        <Route component={Join} exact path="/join"/>
        <Route component={Login} exact path="/login"/>
        <Route component={Mypage} exact path="/mypage"/>
        <Route component={UpdatePassword} exact path="/updatePassword"/>
        <Route component={WishList} exact path="/wishList"/>
        <Route component={Write} exact path="/write"/>
        <Route component={PostDetail} exact path="/:id"/>
      </Switch>
      <Footer/>
      <TopBtnStyle className={btnState ? 'active' : ''} onClick={onScrollTop}>
        <span><b>Top</b></span>
      </TopBtnStyle>
    </>
  );
}

export default App;
