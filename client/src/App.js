import React from 'react';
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

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route component={Main} exact path="/"/>
        <Route component={Join} path="/join"/>
        <Route component={Login} path="/login"/>
        <Route component={Mypage} path="/mypage"/>
        <Route component={PostDetail} path="/postDetail/:id"/>
        <Route component={UpdatePassword} path="/updatePassword"/>
        <Route component={WishList} path="/wishList"/>
        <Route component={Write} path="/write"/>
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
