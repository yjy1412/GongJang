const express = require('express');
const router = express.Router();
const accessFunc = require('./token');
const { User, Post, Wish, Comment } = require('../models');
const { use } = require('../routers');

module.exports = {
  // POST /comments
  post: async (req, res) => {
    console.log(req.body)
    const postsId = req.body.post_id; //postId
    const accessResult = accessFunc(req, res); //유저인증(토큰확인)

    if (!accessResult.identified) {
      return accessResult;
    }

    const id = accessResult.id; //userId
    const inputContent = req.body.content //내용이 있어야 함

    if (!inputContent) {
      return res.status(400).send('내용을 입력해주세요')
    }

    await Comment.create({
      content: inputContent,
      post_id: postsId,
      user_id: id
    })
      .then(async result => {
        Comment.findAll({
          include: [{
            model: User,
            attributes: ['nickname']
          }],
          where: {
            post_id: postsId
          }
        })
          .then(data => {
            console.log(data);
            return res.status(201).json({
              data,
              message: '댓글이 작성되었습니다.'
            })
          })
          .catch (err => {
            console.log(err);
            res.status(500).send("서버에 오류가 발생했습니다")
          })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
  },
  //GET /comments/:posts_id
  get: async (req, res) => {
    console.log(req.params)
    const accessResult = accessFunc(req, res);
    if (!accessResult.identified) {
      return accessResult;
    }
    const { id, email, admin } = accessResult;
    const postsId = req.params.posts_id;
    if (!postsId) {
      return res.status(400).send("필수 입력요소가 누락되었습니다")
    }

    Comment.findAll({
      include: [{
        model: User,
        attributes: ['nickname']
      }],
      where: {
        post_id: postsId
      }
    })
      .then(data => {
        console.log(data)

        res.status(200).json({
          data,
          message: "댓글을 불러왔습니다."
        })
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send('서버에 오류가 발생했습니다.')
      })
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
    const postsId = req.body.post_id
    //댓글 수정 - 빈칸
    if (!inputContent) {
      res.status(400).send('내용을 입력해주세요.')
    }
    try {
      const comment = await Comment.findOne({
        where: {
          id: commentsId
        }
      })
      console.log(comment.dataValues.user_id)
      console.log(userId)

      if (comment.dataValues.user_id !== userId || comment.dataValues.post_id !== postsId) {
        return res.status(401).send('권한이 없습니다.')
      } else {
        await Comment.update({
          content: inputContent
        }, {
          where: {
            id: commentsId
          }
        }).then(result => {
          Comment.findAll({
            include: [{
              model: User,
              attributes: ['nickname']
            }],
            where: {
              post_id: postsId
            }
          })
            .then(data => {
              console.log(data)
              res.status(201).json({
                data,
                message: `${commentsId} 댓글이 수정되었습니다.`
              })
            })
        })
      }
    } catch (err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }

  },
  // DELETE /comments/:comments_id
  delete: async (req, res) => {
    console.log(req.params.comments_id);
    console.log(req.body.post_id)
    const postsId = req.body.post_id
    const accessResult = accessFunc(req, res);
    if (!accessResult.identified) {
      return accessResult;
    }
    const userId = accessResult.id
    const commentsId = req.params.comments_id; //commentsid 

    try {
      const comment = await Comment.findOne({
        where: {
          id: commentsId
        }
      })
      if (!accessResult.admin && comment.dataValues.user_id !== userId) {
        return res.status(401).send('권한이 없습니다.');
      } else {
        Comment.update({
          isDelete: true
        }, {
          where: {
            id: commentsId
          }
        }
        ).then(async result => {
          await Comment.findAll({
            include: [{
              model: User,
              attributes: ['nickname']
            }],
            where: {
              post_id: postsId
            }
          })
            .then(data => {
              res.status(201).json({
                data,
                message: `${commentsId} 댓글이 삭제되었습니다.`
              })
            })
        })
      }
    } catch (err) {
      res.status(500).send("서버에 오류가 발생했습니다")
    }
  }
}