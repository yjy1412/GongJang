const express = require('express');
const router = express.Router();
const accessFunc = require('./token');
const { User, Post, Wish, Comment } = require('../models');
const { use } = require('../routers');

module.exports = {
  // POST /comments
  post: async (req, res) => {
     console.log(req.body)
     const postId = req.body.post_id; //postId
     const accessResult = accessFunc(req, res); //유저인증(토큰확인)
 
     if (!accessResult.identified) {
       return accessResult;
     }
     try{
     const id = accessResult.id; //userId
     const inputContent = req.body.content //내용이 있어야 함

     if(!inputContent) {
       return res.status(400).send('내용을 입력해주세요')
     }
     await Comment.create({
       content : inputContent,
       post_id: postId,
       user_id: id
     })  
     res.status(201).send("댓글이 등록되었습니다.")    
    } catch(err) {
      res.status(500).send("서버에 오류가 발생했습니다")
      }     
  },
  // PATCH /comments/:comments_id
  patch: async (req, res) => {
     const accessResult = accessFunc(req, res); //유저인증(토큰확인) 
     if (!accessResult.identified) {
       return accessResult;
     }
     const inputContent = req.body.content
     const userId = accessResult.id
     const commentsId = req.params.comments_id
     const postId = req.body.post_id
     //댓글 수정 - 빈칸
     if(!inputContent) {
       res.status(400).send('내용을 입력해주세요.')
     } 
      try{
       const comment = await Comment.findOne({
         where : {
          id : commentsId
         }
       }) //수정하고 싶은 댓글 찾기 
       console.log(comment.dataValues.user_id)  
       console.log(userId)    
       
       if(comment.dataValues.user_id !== userId || comment.dataValues.post_id !== postId) {
         return res.status(401).send('권한이 없습니다.')
       } else {
          await Comment.update({
            content : inputContent
           },{
             where : {
               id : commentsId
             }
           }) 
           res.status(201).send('댓글이 수정되었습니다.')
          }
        } catch(err) {        
          res.status(500).send('서버에 오류가 발생했습니다.')
          }
       
  },
  // DELETE /comments/:comments_id
  delete: async (req, res) => {
    console.log(req.params.comments_id);
    console.log(req.body.post_id)
    const accessResult = accessFunc(req, res);
    if (!accessResult.identified) {
      return accessResult;
    }
    const userId = accessResult.id
    const commentsId = req.params.comments_id; //commentsid 
    
    try{
     const comment = await Comment.findOne({
        where : {
          id : commentsId
        }
      })
      if(comment.dataValues.user_id !== userId) {
        return res.status(401).send('권한이 없습니다.');
      }else {
        Comment.destroy({
          where : {
            id : commentsId
          }
        })
        res.sendStatus(204);
      } 
    }catch(err) {
      return res.status(500).send('서버에서 오류가 발생했습니다.')
      }
 }
}