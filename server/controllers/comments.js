const express = require('express');
const router = express.Router();
const accessFunc = require('./token');
const { User, Post, Wish, Comment } = require('../models');
const { use } = require('../routers');

module.exports = {
  // POST /comments
  post: (req, res) => {
     console.log(req.body)
     const postId = req.body.post_id; //postId
     const accessResult = accessFunc(req, res); //유저인증(토큰확인)
 
     if (!accessResult.identified) {
       return accessResult;
     }
     const id = accessResult.id; //userId
     const inputContent = req.body.content //내용이 있어야 함

     if(!inputContent) {
       return res.status(400).send('내용을 입력해주세요')
     }

     Comment.create({
       content : inputContent,
       post_id: postId,
       user_id: id
     })
       .then(result => {
         console.log(result);
         res.status(201).send("댓글이 등록되었습니다.")
       })
       .catch(err => {
         res.status(500).send("서버에 오류가 발생했습니다")
       })
    
  },
  // PATCH /comments/:comments_id
  patch: (req, res) => {
    console.log(req.params.comments_id);
    console.log(req.body);

    const commentsId = req.params.comments_id;
    const reqBody = req.body;

    res.json({
      method: 'PATCH /comments/:comments_id',
      commentsId,
      reqBody
    });
  },
  // DELETE /comments/:comments_id
  delete: async (req, res) => {
    console.log(req.params.comments_id);
    console.log(req.body.post_id)
    const accessResult = accessFunc(req, res);
    if (!accessResult.identified) {
      return accessResult;
    }
    const commentsId = req.params.comments_id; //commentsid 
    
    try{
     const comment = await Comment.findOne({
        where : {
          id : commentsId
        }
      })
      comment.destroy({});
      return res.sendStatus(204)
    }catch(err) {
      return res.status(500).send('서버에서 오류가 발생했습니다.')
    }
  }
}