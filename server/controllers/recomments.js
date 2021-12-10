const express = require('express');
const router = express.Router();
const accessFunc = require('./token');
const { User, Post, Wish, Comment } = require('../models');
const { use } = require('../routers');

module.exports = {
  //POST /recomments/:comments_id  
  post: async (req, res) => {
    const commentsId = req.params.comments_id    
    //일단 해당 comments_id를 ref_comment로 넣어주자
    const accessResult = accessFunc(req, res); //유저인증(토큰확인)
    if (!accessResult.identified) {
      return accessResult;
    }
    const loginId = accessResult.id
    const postsId = req.body.post_id
    const inputContent = req.body.content
    try{
      const userInfo = await User.findOne({
        where : {
          id : loginId
        }
      })
      const nickname = userInfo.dataValues.nickname
      await Comment.create({
        content : inputContent,
        post_id : postsId,
        user_id : loginId,
        ref_comment : commentsId 
      })
      .then(data => { //여기서 만약에 대댓글 불러오기를 하려면 어떻게 해야할 지 고민해보자        
        res.status(201).json({
          data,
          nickname,
          message : '대댓글 작성됨'
        })
      })
    } catch(err) {
      res.status(500).send("서버에 오류 발생")
    }
  },

  //GET /recomments/:comments_id
  get: async(req, res) => { //답글 펼쳐보기 버튼을 눌렀을때 들어오는 요청
    const accessResult = accessFunc(req, res);  
    const postsId = req.body.posts_id
    const loginid = accessResult.id
    const commentsid = req.params.comments_id

    if (!accessResult.identified) {
      return accessResult;
    }
    try{
      await Comment.findAll({
        include: [{
          model: User,
          attributes: ['nickname']
        }],
        where : {
          ref_comment : commentsid
        }
      })
      .then(data => {
        res.json(data)
      })
    } catch(err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }
  },
  patch: async (req, res) => {
    res.send('')
  },
  delete: async (req, res) => {
    res.send('')
  }
}