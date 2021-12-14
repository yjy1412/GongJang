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
      await Comment.create({
        content : inputContent,
        post_id : postsId,
        user_id : loginId,
        ref_comment : commentsId 
      })
      .then(async data => { //여기서 만약에 대댓글 불러오기를 하려면 어떻게 해야할 지 고민해보자        
        await Comment.findAll({
          where : {
            ref_comment : commentsId
          },
          include: [{
            model : User,
            attributes: ['nickname']
          }]
        })
        .then(async data => {
          await res.status(201).json({
            data,
            message : '대댓글이 생성되었습니다.'
          })
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
    const commentsid = req.params.comments_id

    if (!accessResult.identified) {
      return accessResult;
    }
    const loginid = accessResult.id
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
        res.status(200).json({
          data,
          message: '대댓글을 불러왔습니다.'
        })
      })
    } catch(err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }
  },
  //PATCH /recomments/:comments_id
  patch: async (req, res) => {
    const accessResult = accessFunc(req, res);  
    const postsId = req.body.posts_id    
    const commentsId = req.params.comments_id
    const recommentsId = req.body.recomments_id
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
          id : commentsId
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
            id : recommentsId
          }
        })
        .then(data => {
          res.status(201).json({
            data,
            message : '댓글이 수정되었습니다.'
          })
        })
      }
    } catch(err) {
      return res.send('')
    }
  },
  //DELETE /recomments/:comments_id
  delete: async (req, res) => {
    const accessResult = accessFunc(req, res);  
    const postsId = req.body.posts_id    
    const commentsId = req.params.comments_id
    const recommentsId = req.body.recomments_id   
    if (!accessResult.identified) {
      return accessResult;
    }
    const loginid = accessResult.id
    try{  
      const userInfo = await Comment.findOne({
        where : {
          id : commentsId
        }
      })
      const recommentWriter = userInfo.dataValues.user_id
      console.log(recommentWriter)
      if(recommentWriter !== loginid) {
        return res.status(401).send('권한이 없습니다.')
      } else { //댓글 작성자와 로그인 유저가 같다.        
        await Comment.update({
          isDelete : true
        }, {
          where : {
            id : recommentsId
          }
        })
        .then(data => {
          res.status(201).json({
            data,
            message : '댓글이 삭제되었습니다.'
          })
        })
      }
    } catch(err) {
      return res.send('')
    }
  }
}