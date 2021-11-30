require('dotenv').config();
const { User, Post } = require('../models');
const { Sequelize, Op } = require('sequelize');
const accessFunc = require('./token');

module.exports = {
  // POST /posts
  post: (req, res) => {
    // 1. 권한 인증
    const result = accessFunc(req, res);
    if (result.identified !== true) {
      return result;
    }
    const email = result.email;

    const inputTitle = req.body.title;
    const inputImage1 = req.body.inputImage1;
    const inputImage2 = req.body.inputImage2;
    const inputImage3 = req.body.inputImage3;
    const inputContent = req.body.content;
    const inputCategory = req.body.category;
    const inputState = req.body.state;

    // 2. 필수 입력요소 누락여부 검사
    if( !inputTitle || !inputCategory || !inputState ) {
      return res.status(400).send("필수 입력요소가 누락되었습니다")
    }

    User.findOne({ where: { email } })
      .then(result => {
        console.log(result);
        // 3. 유저 유효성 검사
        if ( !result ) {
          return res.status(404).send("요청하신 회원정보와 일치하는 회원정보가 없습니다")
        }
        // 4. 정상적인 요청 처리
        const userInfo = result.dataValues;
        const { id } = userInfo;

        Post.create({
          user_id: id,
          title: inputTitle,
          content: inputContent,
          category: inputCategory,
          state: inputState,
          image1: inputImage1,
          image2: inputImage2,
          image3: inputImage3
        })
          .then(result => {
            res.status(201).send("작성된 글이 업로드 되었습니다")
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
    // 2. 
  },
  // PATCH /posts/:posts_id
  patch: (req, res) => {
    console.log(req.params.posts_id)
    const postsId = req.params.posts_id;

    res.json({
      method: 'PATCH /posts/:posts_id',
      postsId
    });
  },
  // DELETE /posts/:posts_id
  delete: (req, res) => {
    console.log(req.params.posts_id)
    const postsId = req.params.posts_id;

    res.json({
      method: 'DELETE /posts/:posts_id',
      postsId
    });
  },
  // GET /posts
  get : (req, res) => {
    res.send('GET /posts');
  },
  // GET /posts/:user_email
  getWishLists: (req, res) => {
    console.log(req.params.user_email);
    const userEmail = req.params.user_email;

    res.json({
      method: 'GET /posts/:user_email',
      userEmail
    });
  },
  // GET /posts/:posts_id
  getDetail: (req, res) => {
    console.log(req.params.posts_id);
    const postsId = req.params.posts_id;

    res.json({
      method: 'GET /posts/:posts_id',
      postsId
    });
  }
}