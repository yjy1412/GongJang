require('dotenv').config();
const { User, Post, Wish } = require('../models');
const { Sequelize, Op } = require('sequelize');
const accessFunc = require('./token');
const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    // 0. 연결 테스트
    const postId = req.body.post_id;
    const accessResult = accessFunc(req, res);

    // 1. 권한 인증
    if (!accessResult.identified) {
      return accessResult;
    }
    const { id, email } = accessResult;

    // 2. inputData 유효성 검증
    Post.findOne({ where: { id: postId } })
      .then(result => {
        if (!result) {
          return res.status(400).send("요청하신 게시글 정보를 찾을 수 없습니다")
        }
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send("서버에 에러가 발생했습니다")
      })

    // 3. 데이터 조회
    Wish.findOrCreate({
      where: {
        post_id: postId,
        user_id: id
      }
    })
      .then(([result, created]) => {
        if ( !created ) {
          return res.status(400).send("좋아요 요청은 중복요청하실 수 없습니다")
        }
        console.log(result);
        return res.status(201).send("해당 게시글이 위시등록 되었습니다.")
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("서버에 오류가 발생했습니다")
      })
  },

  delete: (req, res) => {
    // 0. 연결 테스트
    const postId = req.body.post_id;
    const accessResult = accessFunc(req, res);

    // 1. 권한 인증
    if (!accessResult.identified) {
      return accessResult;
    }
    const { id, email } = accessResult;

    // 2. inputData 유효성 검증
    Post.findOne({ where: { id: postId } })
      .then(result => {
        if (!result) {
          return res.status(400).send("요청하신 게시글 정보를 찾을 수 없습니다")
        }
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send("서버에 에러가 발생했습니다")
      })

    // 3. 데이터 조회
    Wish.destroy({
      where: {
        post_id: postId,
        user_id: id
      }
    })
      .then(result => {
        console.log(result);
        // 상태코드 204는 메시지를 보낼 수 없음
        res.sendStatus(204)
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
  }
}