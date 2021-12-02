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
        <Route component={Join} exact path="/join"/>
        <Route component={Login} exact path="/login"/>
        <Route component={Mypage} exact path="/mypage"/>
        <Route component={UpdatePassword} exact path="/updatePassword"/>
        <Route component={WishList} exact path="/wishList"/>
        <Route component={Write} exact path="/write"/>
        <Route component={PostDetail} exact path="/:id"/>
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
