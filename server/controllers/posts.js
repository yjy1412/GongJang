require('dotenv').config();
const { User, Post, Wish } = require('../models');
const { Sequelize, Op } = require('sequelize');
const accessFunc = require('./token');
const jwt = require('jsonwebtoken');

module.exports = {
  // POST /posts
  post: (req, res) => {
    // 1. 권한 인증
    const result = accessFunc(req, res);
    if (!result.identified) {
      return result;
    }
    const email = result.email;

    const inputTitle = req.body.title;
    const inputImage = req.body.image;
    console.log(inputImage)
    console.log(inputImage[0])
    const inputContent = req.body.content;
    const inputCategory = req.body.category;
    const inputSoldOut = req.body.soldOut;
    // inputImage 배열처리
    // TODO: 디폴트 이미지 정해지면 타입 고려해서 반영
    let image1 = null;
    let image2 = null;
    let image3 = null;
    for (let i = 0; i < inputImage.length; i += 1) {
      if( i === 0 ) {
        image1 = inputImage[i];
      } else if( i === 1 ) {
        image2 = inputImage[i];
      } else if( i === 2 ) {
        image3 = inputImage[i];
      }
    }

    // 2. 필수 입력요소 누락여부 검사
    if ( !inputTitle || !inputCategory ) {
      return res.status(400).send("필수 입력요소가 누락되었습니다")
    }

    User.findOne({ where: { email } })
      .then(result => {
        console.log(result);
        // 3. 유저 유효성 검사
        if (!result) {
          return res.status(404).send("요청하신 회원정보와 일치하는 회원정보가 없습니다")
        }
        // 4. 정상적인 요청 처리$
        const userInfo = result.dataValues;
        const { id } = userInfo;

        Post.create({
          user_id: id,
          title: inputTitle,
          content: inputContent,
          category: inputCategory,
          soldOut: inputSoldOut,
          image1,
          image2,
          image3
        })
          .then(result => {
            console.log(result);
            res.status(201).json({
              post_id: result.dataValues.id,
              message: "작성된 글이 업로드 되었습니다"
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
  get: (req, res) => {
    res.send('GET /posts');
  },
  // GET /posts/:posts_id
  getDetail: async (req, res) => {
    // TODO: 댓글 기능 구현 후 내용 추가하기 / 비회원 기능 구현
    console.log(req.params.posts_id);
    const postsId = req.params.posts_id;
    let wish = false;

    // 1. 회원/비회원 여부 검토
    const result = accessFunc(req, res);

    if ( result.identified ) {
      const email = result.email;

      User.findOne({ where: { email } })
        .then(result => {
          const userInfo = result.dataValues;
          if (!userInfo) {
            return res.status(404).send("요청하신 회원정보와 일치하는 회원정보가 없습니다")
          }
          const { id } = userInfo;

          // 1-2. wish 여부 데이터 조회
          Wish.findOne({
            where: {
              user_id: id,
              post_id: postsId
            }
          })
            .then(resut => {
              if (result) {
                wish = true;
              }
            })
            .catch(err => {
              console.log(err);
              return res.status(500).send("서버에 오류가 발생했습니다")
            })
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send("서버에 오류가 발생했습니다")
        })
    }

    // 2. 데이터 조회
    Post.findOne({
      where: { id: postsId },
      include: {
        model: User,
        attributes: [ 'email', 'nickname' ]
      }
    })
      .then(result => {
        console.log(result.dataValues);
        console.log(result.User.dataValues.email);

        // 2-1. 요청 데이터 정리
        const postData = result.dataValues;
        const userInfo = result.User.dataValues;
        const { id, title, content, category, soldOut, image1, image2, image3, createdAt, updatedAt } = postData;
        const { email, nickname } = userInfo;

        res.status(201).json({
          data: {
            post_id: id,
            writer: {
              writer_email: email,
              writer_nickname: nickname
            },
            title,
            content,
            category,
            soldOut,
            image1,
            image2,
            image3,
            createdAt,
            updatedAt,
            wish
          },
          message: "게시물이 업로드 되었습니다"
        })
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("서버에 오류가 발생했습니다")
      })
  }
}