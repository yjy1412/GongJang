const express = require('express');
const router = express.Router();
const accessFunc = require('./token');
const { User, Post, Wish, Comment } = require('../models');
const { use } = require('../routers');

module.exports = {
  // POST /comments
  post: async (req, res) => {
    const accessResult = accessFunc(req, res); //유저인증(토큰확인) 
    if (!accessResult.identified) {
      return accessResult;
    }
    const postId = req.body.post_id; //postId       
    const loginId = accessResult.id; //userId
    const inputContent = req.body.content //내용이 있어야 함

    try {
      if (!inputContent) {
        return res.status(400).send('내용을 입력해주세요')
      }

      const postInfo = await Post.findOne({
        where : {
          id : postId
        }
      })
      const writer = postInfo.dataValues.user_id

      await Comment.create({
        content : inputContent,
        post_id : postId,
        user_id : loginId
      })
      .then(async data => {
        console.log(data)
        if(loginId === writer) { //작성자와 로그인아이디가 동일하다면
          await Comment.findAll({ //모든 일반 댓글을 불러오는 코드
            include : [{
              model : User,
              attributes: ['nickname']
            }],
            where : {
              post_id : postId,
              ref_comment : null
            }
          })
          .then(async data => {
            await res.status(201).json({
              data,
              message : "댓글을 작성했습니다."
            })
          })
        } else { //작성자와 로그인 유저가 일치하지 않으면
          await Comment.findAll({
            include : [{
              model : User,
              attributes : ['nickname']
            }],
            where : { //해당 게시물에서 본인이 쓴 모든 글을 불러옴
            post_id : postId,
            user_id : loginId,
            ref_comment : null
            }
          })
          .then(async data => {
           await res.status(201).json({
              data,
              message : "댓글을 작성했습니다."
            })
          })
        }
      })
    } catch (err) {
      return res.status(500).send("서버에 오류가 발생했습니다")
    }
  },
  //GET /comments/:post_id
  get: async (req, res) => {    
    const accessResult = accessFunc(req, res);
    if (!accessResult.identified) {
      return accessResult;
    }
    const postId = req.params.post_id
    const loginId = accessResult.id
    //get에서 분기를 나눠줘야 한다
    //1. loginId가 Post.user_id와 일치할 때 => ref_comment가 null인 댓글을 불러와야 한다.
    //1. 1번이 아닐때는 Comment.user_id 가 loginId와 일치하는 ref_comment가 null인 댓글을 불러와야 한다.
    try {
      const postInfo = await Post.findOne({
        where : {
          id : postId
        }
      })
      const writer = postInfo.dataValues.user_id

      if(loginId === writer) {
        await Comment.findAll({
          include : [{
            model : User,
            attributes : ['nickname']
          }],
          where: {
            post_id : postId,
            ref_comment : null
          }
        })
          .then(data => {
            res.status(200).json(data)
          })
      } else {
        await Comment.findAll({
          include : [{
            model : User,
            attributes : ['nickname']
          }],
          where: {
            post_id: postId,
            user_id: loginId,
            ref_comment : null
          }
        })
        .then(data => {
          return res.status(200).json(data)
        })
      }
    } catch (err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }
  },  
  // PATCH /comments/:comment_id
  patch: async (req, res) => {
    const accessResult = accessFunc(req, res); //유저인증(토큰확인) 
    if (!accessResult.identified) {
      return accessResult;
    }
    const inputContent = req.body.content
    const loginId = accessResult.id
    const commentId = req.params.comment_id
    const postId = req.body.post_id
    //댓글 수정 - 빈칸    
    try {
      if (!inputContent) {
        return res.status(400).send('내용을 입력해주세요')
      }

      const postInfo = await Post.findOne({
        where : {
          id : postId
        }
      })
      const writer = postInfo.dataValues.user_id

      const comment = await Comment.findOne({
        where : {
          id : commentId
        }
      }) 
      const commentWriter = comment.dataValues.user_id

      if (commentWriter !== loginId) { 
        return res.status(401).send('권한이 없습니다.')
      } else {        
        await Comment.update({
          content: inputContent
        }, {
          where : { //대댓글이 수정되어야 함.
            id : commentId
          }
        }).then(async data => {
          if(writer === loginId) {
            await Comment.findAll({
              include : [{
                model : User,
                attributes : ['nickname']
              }],
              where: {
                post_id: postId,
                ref_comment: null
              }
            })
            .then(async data => {
              await res.status(200).json({
                data,
                message : '댓글이 수정되었습니다.'
              })
            })
          } else {
            await Comment.findAll({
              include : [{
                model : User,
                attributes : ['nickname']
              }],
              where: {
                post_id: postId,
                user_id: loginId,
                ref_comment: null
              }
            })
            .then(async data => {
              await res.status(200).json({
                data,
                message : '댓글이 수정되었습니다.'
              })
            })
          }
        })
      }
    } catch (err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }

  },
  // DELETE /comments/:comment_id
  delete: async (req, res) => {
    const accessResult = accessFunc(req, res);   
    if (!accessResult.identified) {
      return accessResult;
    }
    const postId = req.body.post_id     
    const loginId = accessResult.id
    const admin = accessResult.admin
    const commentId = req.params.comment_id; //commentsid 

    try {
      const userInfo = await User.findOne({
        where : {
          id : loginId
        }
      })
      const nickname = userInfo.dataValues.nickname

      const comment = await Comment.findOne({
        where: {
          id: commentId
        }
      })
      const commentWriter = comment.dataValues.user_id

      const postInfo = await Post.findOne({
        where : {
          id : postId
        }
      })
      const writer = postInfo.dataValues.user_id
      
      if ( admin === null || commentWriter !== loginId ) { //admin이 없거나 댓글 작성자와 로그인유저가 다를때 => 권한이 없다.
        return res.status(401).send('권한이 없습니다.');
      } else {
        await Comment.update({
          isDelete : true,
          content : "삭제되었습니다."
        },{
          where: {
            id: commentId
          }}
        ).then(async data => {
            if(writer === loginId) {
              await Comment.findAll({
                include: {
                  model: User,
                  attributes: ['nickname']
                },
                where: {
                  post_id: postId,
                  ref_comment: null
                }
              })
              .then(async data => {
                await res.status(200).json({
                  data,
                  message: '댓글이 삭제되었습니다.'
                })
              })
            } else {
              await Comment.findAll({
                include: {
                  model: User,
                  attributes: ['nickname']
                },
                where: {
                  post_id: postId,
                  user_id: loginId,
                  ref_comment: null
                }
              })
              .then(async data => {
                await res.status(200).json({
                  data,
                  message: '댓글이 삭제되었습니다.'
                })
              })
            }
        })
      }
      } catch (err) {
        return res.status(500).send("서버에 오류가 발생했습니다")
      }
  }
  }