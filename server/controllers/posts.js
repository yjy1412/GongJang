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
    // console.log(inputImage[0])
    const inputContent = req.body.content;
    const inputCategory = req.body.category;
    const inputSoldOut = req.body.soldOut;
    // inputImage 배열처리
    // TODO: 디폴트 이미지 정해지면 타입 고려해서 반영
    let image1 = null;
    let image2 = null;
    let image3 = null;

    if (inputImage !== undefined) {
      for (let i = 0; i < inputImage.length; i += 1) {
        if (i === 0) {
          image1 = inputImage[i];
        } else if (i === 1) {
          image2 = inputImage[i];
        } else if (i === 2) {
          image3 = inputImage[i];
        }
      }
    }
    // 2. 필수 입력요소 누락여부 검사
    if (!inputTitle || !inputCategory) {
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
  patch: async (req, res) => {
    const postsId = req.params.posts_id; 
    //유저 유효성 검사 
    const result = accessFunc(req, res);
    if (!result.identified) {
      return result;
    }
    
    const inputTitle = req.body.title;   
    const inputContent = req.body.content;
    const inputCategory = req.body.category;
    const inputSoldOut = req.body.soldOut;
    const inputImage = req.body.image;
    let image1, image2, image3 = null;
    if( inputImage !== undefined){
      for (let i = 0; i < inputImage.length; i += 1) {
        if (i === 0) {
          image1 = inputImage[i];
        } else if (i === 1) {
          image2 = inputImage[i];
        } else if (i === 2) {
          image3 = inputImage[i];
        }
      }
    }
    
    if (!inputTitle || !inputCategory) {
      return res.status(403).send("필수 입력요소가 누락되었습니다")
    }
   
    const postsData = await Post.findOne({where : { id : postsId}})  
    console.log(postsData.user_id)
    const userInfo = await User.findOne({where : {email : result.email}})
    console.log(userInfo.dataValues.id)

    if(userInfo.dataValues.id !== postsData.user_id) { 
      return res.status(400).send('작성자가 아닙니다.')
      //잡아냈음
    } else {
    try {
       Post.update({
         title : inputTitle,
         content : inputContent, 
         category : inputCategory,
         soldout : inputSoldOut,
         image1 ,
         image2 ,
         image3  
       }, {where : {
         id : postsId
       }})
       res.status(201).json({
         post_id : postsId,
         message : "수정 되었습니다"
       })
    }catch(err) {
      res.status(500).send('서버에 오류가 발생했습니다.')
    }
  }

  },
  // DELETE /posts/:posts_id
  delete: async (req, res) => {
    console.log(req.params.posts_id)
    const postsId = req.params.posts_id;

    //유저 권한 인증
    const result = accessFunc(req, res);
    if (!result.identified) {
      return result;
    }
    
    //권한이 있다면
    if (result) {
      try {
        const postInfo = await Post.findOne({
          where: { id: postsId }
        })
        await postInfo.destroy({});
        return res.status(204).send('게시물 삭제 성공')
      } catch (err) {
        return res.status(500).send('서버에 오류가 발생했습니다.')
      }
      //권한이 없다면
    } else {
      return res.status(401).send('유효하지 않은 토큰입니다.')
    }

  },
  // GET /posts
  get: async (req, res) => {
    // 함수 실행 결과, res.send가 있으면 바로 메시지를 보내버리기 때문에 사용할 수 없음
    // const result = accessFunc(req, res);

    // 1. 회원/비회원 여부 검토 후 회원이라면 유저 식별정보 저장
    const authorization = req.headers.authorization;
    let userEmail;
    let userId;

    if (authorization) {
      const accessToken = authorization.split(' ')[1];
      console.log(accessToken);

      let accessData;
      try {
        accessData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      } catch {
        // 엑세스 토큰이 유효하지 않을 때
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
          // 리프레쉬 토큰이 req.cookies에 담겨 있다면,
          try {
            // 리프레쉬 토큰을 통한 엑세스 데이터 임시추출
            accessData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
          } catch {
            // 리프레쉬 토큰 마저 유효하지 않을 때(30일 경과 또는 토큰 훼손)
            return res.status(401).send("권한인증에 실패했습니다(토큰 유효하지 않음)")
          }
        } else {
          // 리프레쉬 토큰이 없다면 바로 에러메시지 전송
          return res.status(401).send("권한인증에 실패했습니다(토큰 유효하지 않음)")
        }
      }
      // 1-1. 회원의 요청의 경우 요청회원의 정보를 저장
      userEmail = accessData.email;
      userId = accessData.id;
    }

    // 2. 데이터 조회
    Post.findAll()
      .then(async result => {
        // console.log(result);
        const responseData = await Promise.all(
          result.map(async post => {
            let postData = post.dataValues;
            const writerId = postData.user_id;

            // Sequelize 쿼리는 스코프 밖의 변수에 영향을 줄 수 없다?? 노노
            // 아아!! 비동기 처리기 때문에 undefined 상태에서 처리가 될 수 있구나
            return await User.findOne({ where: { id: writerId } })
              .then(async result => {
                const userInfo = result.dataValues;
                writerEmail = userInfo.email;
                writerNickname = userInfo.nickname;

                if (userId) {
                  // 2-1. 회원인 경우.
                  return await Wish.findOne({
                    where: {
                      user_id: userId,
                      post_id: postData.id
                    }
                  })
                    .then(result => {
                      // 2-1-1. 회원이면서 좋아요를 누른 경우.
                      if (result) {
                        postData.writer = {
                          writer_email: writerEmail,
                          writer_nickname: writerNickname
                        };
                        postData.wish = true;
                        delete postData.user_id;
                        // console.log(postData);
                        return postData;
                      } else {
                        // 2-1-2. 회원이지만, 좋아요를 누르지 않은 경우.
                        postData.writer = {
                          writer_email: writerEmail,
                          writer_nickname: writerNickname
                        };
                        postData.wish = false;
                        delete postData.user_id;
                        // console.log(postData);
                        return postData;
                      }
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).send("서버에 오류가 발생했습니다")
                    })

                } else {
                  // 2-2. 비회원인 경우.
                  postData.writer = {
                    writer_email: writerEmail,
                    writer_nickname: writerNickname
                  };
                  postData.wish = false;
                  delete postData.user_id;

                  return postData;
                }
              })
              .catch(err => {
                console.log(err);
                res.status(500).send("서버에 오류가 발생했습니다")
              })
          })
        )
        console.log(responseData);

        // 날짜 순 정렬(작성 일 기준 최신 순)
        responseData.sort((a,b) => {
          return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
        })
        res.status(200).json(responseData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })

  },
  // GET /posts/:posts_id
  getDetail: async (req, res) => {
    // TODO: 댓글 기능 구현 후 내용 추가하기
    console.log(req.params.posts_id);
    const postsId = req.params.posts_id;
    let wish = false;

    // 1. 회원/비회원 여부 검토
    // 함수 실행 결과, res.send가 있으면 바로 메시지를 보내버리기 때문에 사용할 수 없음
    // const result = accessFunc(req, res);

    // 1-1. 회원일때의 별도 처리과정
    const authorization = req.headers.authorization;

    if (authorization) {
      const accessToken = authorization.split(' ')[1];
      console.log(accessToken);

      let accessData;
      try {
        accessData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      } catch {
        // 엑세스 토큰이 유효하지 않을 때
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
          // 리프레쉬 토큰이 req.cookies에 담겨 있다면,
          try {
            // 리프레쉬 토큰을 통한 엑세스 데이터 임시추출
            accessData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
          } catch {
            // 리프레쉬 토큰 마저 유효하지 않을 때(30일 경과 또는 토큰 훼손)
            return res.status(401).send("권한인증에 실패했습니다(토큰 유효하지 않음)")
          }
        } else {
          // 리프레쉬 토큰이 없다면 바로 에러메시지 전송
          return res.status(401).send("권한인증에 실패했습니다(토큰 유효하지 않음)")
        }
      }
      const { email } = accessData;

      // wish 여부를 알기 위한 유저정보 조회
      wish = await User.findOne({ where: { email } })
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
                return true;
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
        attributes: ['email', 'nickname']
      }
    })
      .then(result => {
        if (!result) {
          return res.status(404).send("해당 게시물은 존재하지 않습니다")
        }
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