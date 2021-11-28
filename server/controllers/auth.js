require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  // POST auth/sign-up
  signup : (req, res) => {
    // request connect test!
    console.log(req.body);
    
    // input body data validation
    const inputEmail = req.body.email;
    const inputNickname = req.body.nickname;
    const inputPassword = req.body.password;

    if ( !inputEmail || !inputNickname || !inputPassword ) {
      res.status(400).send("필수 입력요소가 누락되었습니다");
    } else {
      User.findOrCreate({
        where: { email: inputEmail },
        defaults: {
          nickname: inputNickname,
          password: inputPassword
        }
      })
      .then(( [ data, created ] ) => {
        console.log(data, created);
        if ( !created ) {
          res.status(400).send("입력하신 이메일은 이미 사용 중입니다");
        } else {
          console.log(data);
          res.status(201).send("회원가입에 성공하였습니다")
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
    }
  },
  // POST auth/log-in
  login : (req, res) => {
    res.send('auth/login');
  },
  // POST auth/log-out
  logout : (req, res) => {
    res.send('auth/logout');
  },
  // DELETE auth/sign-out
  signout : (req, res) => {
    res.send('auth/signout');
  },
  // GET auth/mypage
  getMypage : (req, res) => {
    res.send('Get auth/mypage');
  },
  // GET auth/mypage/posts
  getMyposts : (req, res) => {
    res.send('Get auth/mypage/posts');
  },
  // PATCH auth/mypage
  patchMypage : (req, res) => {
    res.send('Patch auth/mypage');
  },
  // PATCH auth/password
  patchPassword : (req, res) => {
    res.send('Patch auth/password');
  }

}