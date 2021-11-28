require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  // POST auth/sign-up
  signup : (req, res) => {
    // connecting test
    console.log(req.body);
    
    // input data validation
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
    // connecting test
    console.log(req.body);

    // input data validation
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    if( !inputEmail || !inputPassword ) {
      res.status(400).send("필수 입력요소가 누락되었습니다");
    } else {
      User.findOne({
        where: {
          email: inputEmail
        }
      })
      .then(data => {
        console.log(data);
        if( !data ) {
          res.status(404).send("입력하신 이메일 정보와 일치하는 회원정보가 없습니다")
        } else {
          if( data.password !== inputPassword ) {
            res.status(404).send("비밀번호가 일치하지 않습니다")
          } else {
            const { email } = data.email;
            const accessToken = jwt.sign(
              { email },
              process.env.ACCESS_SECRET,
              { expiresIn: "1d" }
            );
            const refreshToken = jwt.sign(
              { email },
              process.env.REFRESH_SECRET,
              { expiresIn: "30d" }
            )
            // token check
            console.log(accessToken);
            console.log(refreshToken);
            
            // response
            res.cookie("refreshToken", refreshToken, {httpOnly: true, expiresIn: "30d"})
            res.json({ accessToken })
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
    }
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