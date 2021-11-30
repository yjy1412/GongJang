require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const accessFunc = require('./token');

module.exports = {
  // POST auth/sign-up
  signup: async (req, res) => {
    // connecting test
    console.log(req.body);

    // input data validation
    const inputEmail = req.body.email;
    const inputNickname = req.body.nickname;
    const inputPassword = req.body.password;

    if (!inputEmail || !inputNickname || !inputPassword) {
      return res.status(400).send("필수 입력요소가 누락되었습니다");
    }
    // 1. 이메일 중복여부 검사
    User.findOne({ where: { email: inputEmail } })
      .then(result => {
        if (result) {
          return res.status(400).send("이미 사용 중인 이메일입니다")
        }
        // 2. 닉네임 중복여부 검사
        User.findOne({ where: { nickname: inputNickname } })
          .then(result => {
            if (result) {
              return res.status(400).send("이미 사용 중인 닉네임입니다")
            }
            // 3. 회원가입 정보 생성
            User.create({
              email: inputEmail,
              nickname: inputNickname,
              password: inputPassword
            })
              .then(result => {
                res.status(201).send("회원가입 되었습니다")
              })
              .catch(err => {
                console.log(err);
                res.status(500).send("서버에 오류가 발생했습니다")
              })
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("서버에 오류가 발생했습니다")
          })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
  },
  // POST auth/log-in
  login: async (req, res) => {
    // connecting test
    // console.log(req.body);

    // input data validation
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    if (!inputEmail || !inputPassword) {
      res.status(400).send("필수 입력요소가 누락되었습니다");
    } else {
      User.findOne({
        where: {
          email: inputEmail
        }
      })

        .then(data => {
          console.log(data);
          if (!data) {
            res.status(404).send("입력하신 이메일 정보와 일치하는 회원정보가 없습니다")
          } else {
            if (data.password !== inputPassword) {
              res.status(404).send("비밀번호가 일치하지 않습니다")
            } else {
              console.log("DATA : ", data);
              const { email, nickname, profile_image, admin } = data.dataValues;
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
              res.cookie("refreshToken", refreshToken, { httpOnly: true, expiresIn: "30d" })
              res.json({
                accessToken: accessToken,
                userInfo: { email, nickname, profile_image, admin },
                message: "로그인에 성공했습니다"
              })
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

  logout: async (req, res) => {
    // TODO 이상 없는 지 확인해보기
    try {
      console.log(req.headers)
      res.clearCookie('refreshToken')
      res.status(200).send('로그아웃 성공');
    }catch(err) {
      console.log(err)
      return res.status(500).send('서버 오류')
    }
  },
  // DELETE auth/sign-out
  signout: async (req, res) => {
    // TODO 이상 없는 지 확인해보기
    // console.log(req.headers)
    try {

      await User.destroy({

        where: { email: req.body.email }
        
      })
      res.clearCookie('refreshToken')
      res.status(204).send('회원탈퇴에 성공했습니다.')
      console.log(req)
    } catch (err) {

      res.status(500).send('서버 오류')

    }
  
  },
  // GET auth/mypage
  getMypage: async (req, res) => {

    const result = accessFunc(req, res);

    if ( !result.identified ) {
      return result;
    }
    const email = result.email;
    User.findOne({ where: { email } })
      .then(userInfo => {
        console.log(userInfo);
        // 2-1. 토큰에 담긴 유저 데이터와 일치하는 데이터가 없을 때
        if (!userInfo) {
          return res.status(404).send("요청하신 회원정보와 일치하는 회원정보가 존재하지 않습니다")
        }
        // 2-2. 정상적인 조회 요청이 이루어졌을 때
        const { email, nickname, admin, profile_image } = userInfo
        res.json({
          userInfo: { email, nickname, profile_image, admin },
          message: "회원정보 요청에 성공했습니다"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
    // }
  },
  // GET auth/mypage/posts
  getMyposts: async (req, res) => {
    // TODO
    res.send('Get auth/mypage/posts');
  },
  // PATCH auth/mypage
  patchMypage: async (req, res) => {
    // 1. 권한 인증
    const result = accessFunc(req, res);

    if ( !result.identified ) {
      return result;
    }
    const email = result.email;

    // 2. 입력 데이터 DB 반영
    const inputNickname = req.body.nickname;
    const inputProfileImage = req.body.profile_image;

    if (inputNickname === "") {
      // !! null과 ""의 차이가 뭘까??
      return res.status(400).send("닉네임을 작성해주세요")
    }
    // 2-1. 닉네임 중복여부 검사
    User.findOne({ where: { nickname: inputNickname } })
      .then(result => {
        if (result) {
          return res.status(400).send("이미 사용 중인 닉네임입니다")
        };
        // 2-2. 회원정보 수정 반영
        User.update({
          nickname: inputNickname,
          profile_image: inputProfileImage
        }, { where: { email } })
          .then(result => {
            console.log(result);
            res.status(201).send("회원정보가 수정되었습니다")
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("서버에 오류가 발생했습니다")
          })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })

  },
  // PATCH auth/password
  patchPassword: async (req, res) => {
    // 1. 권한 인증
    const result = accessFunc(req, res);

    if ( !result.identified ) {
      return result;
    }
    const email = result.email;
    // 2. 입력된 current 비밀번호 확인
    User.findOne({ where: { email } })
      .then(userInfo => {
        // 2-1. 일치하는 유저정보가 존재하지 않을 때
        if (!userInfo) {
          return res.status(404).send("요청하신 회원정보와 일치하는 회원정보가 존재하지 않습니다")
        }

        const { password } = userInfo.dataValues;
        const inputCurrentPassword = req.body.current;
        const inputNewPassword = req.body.new;

        // 2-2. 입력된 비밀번호가 이전 비밀번호와 다를 때
        if (inputCurrentPassword !== password) {
          return res.status(404).send("비밀번호가 틀렸습니다")
        }
        // 2-3 정상적인 요청 결과
        User.update({ password: inputNewPassword }, {
          where: { email }
        })
          .then(result => {
            res.status(201).send("회원님의 비밀번호가 정상적으로 수정되었습니다")
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("서버에 오류가 발생했습니다")
          })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
  }
}