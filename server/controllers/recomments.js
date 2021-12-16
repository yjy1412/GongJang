const express = require('express');
const router = express.Router();
const accessFunc = require('./token');
const { User, Post, Wish, Comment } = require('../models');
const { use } = require('../routers');

module.exports = {
  //POST /recomments/:comment_id  
  post: async (req, res) => {
    const commentId = req.params.comment_id    
    //일단 해당 comment_id를 ref_comment로 넣어주자
    const accessResult = accessFunc(req, res); //유저인증(토큰확인)
    if (!accessResult.identified) {
      return accessResult;
    }
    const loginId = accessResult.id
    const postId = req.body.post_id
    const inputContent = req.body.content
    try{
      await Comment.create({
        content : inputContent,
        post_id : postId,
        user_id : loginId,
        ref_comment : commentId
      })
      .then(async data => {
        const recommentId = data.dataValues.id
        await Comment.findOne({
          include : [{
            model : User,
            attributes : ['nickname']
          }],
          where : {
            id : recommentId
          }
        })
        .then(data => {
          //대댓글 작성
          return res.status(201).json(data)
        })
      })
    } catch(err) {
      return res.status(500).send("서버에 오류가 발생했습니다.")
    }
  },

  //GET /recomments/:comment_id
  get: async(req, res) => { //답글 펼쳐보기 버튼을 눌렀을때 들어오는 요청
    const accessResult = accessFunc(req, res);
    const commentid = req.params.comment_id

    if (!accessResult.identified) {
      return accessResult;
    }

    try{
      await Comment.findAll({
        include : [{
          model : User,
          attributes : ['nickname']
        }],
        where : {
          ref_comment : commentid
        }
      })
      .then(data => {
       return res.status(200).json(data)
      })
    } catch(err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }
  },
  //PATCH /recomments/:comment_id
  patch: async (req, res) => {
    const accessResult = accessFunc(req, res);
    const commentId = req.params.comment_id
    const recommentId = req.body.recomment_id
    const inputContent = req.body.content
    if (!accessResult.identified) {
      return accessResult;
    }
    const loginid = accessResult.id
    try{ //댓글 수정 권한은 댓글 작성자 한테만 있다
      if (!inputContent) {
        return res.status(400).send('내용을 입력해주세요')
      }
      const userInfo = await Comment.findOne({
        where : {
          id : commentId
        }
      })
      const recommentWriter = userInfo.dataValues.user_id
      console.log(recommentWriter)
      if(recommentWriter !== loginid) {
        return res.status(401).send('권한이 없습니다.')
      } else { //댓글 작성자와 로그인 유저가 같다.        
        await Comment.update({
          content : inputContent
        }, {
          where : {
            id : recommentId
          }
        })
        .then(async data => {
          return res.status(200).json(data)
        })
      }
    } catch(err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }
  },
  //DELETE /recomments/:comment_id
  delete: async (req, res) => {
    const accessResult = accessFunc(req, res);
    const commentId = req.params.comment_id
    const recommentId = req.body.recomment_id 
    const admin = accessResult.admin  
    if (!accessResult.identified) {
      return accessResult;
    }
    const loginid = accessResult.id
    try{  
      const userInfo = await Comment.findOne({
        where : {
          id : commentId
        }
      })
      const recommentWriter = userInfo.dataValues.user_id
      console.log(recommentWriter)
      if( admin === false && recommentWriter !== loginid ) {
        return res.status(401).send('권한이 없습니다.')
      } else { //댓글 작성자와 로그인 유저가 같다.        
        await Comment.update({
          isDelete : true,
          content : "삭제되었습니다."
        }, {
          where : {
            id : recommentId
          }
        })
        .then(data => {
          return res.status(200).json(data)
        })
      }
    } catch(err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }
  }
}