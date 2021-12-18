require('dotenv').config();
const fs = require('fs');
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
    const inputImage = req.files;
    console.log("req.files: ", inputImage)
    // console.log(inputImage[0])
    const inputContent = req.body.content;
    const inputCategory = req.body.category;
    const inputSoldOut = req.body.soldOut;

    // inputImage 배열처리
    let image1 = '';
    let image2 = '';
    let image3 = '';

    if (inputImage !== undefined) {
      for (let i = 0; i < inputImage.length; i += 1) {
        if (i === 0) {
          image1 = __dirname + '/../' + inputImage[i].path;
        } else if (i === 1) {
          image2 = __dirname + '/../' + inputImage[i].path;
        } else if (i === 2) {
          image3 = __dirname + '/../' + inputImage[i].path;
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
          return res.status(400).send("요청하신 회원정보와 일치하는 회원정보가 없습니다")
        }
        // 4. 정상적인 요청 처리
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
  // PATCH /posts/:post_id
  patch: async (req, res) => {
    // 권한 인증
    console.log(req.body);
    console.log(req.files);
    const result = accessFunc(req, res);
    if (!result.identified) {
      return;
    }

    const userEmail = result.email;
    const postId = req.params.post_id;
    const inputTitle = req.body.title;
    const inputContent = req.body.content;
    const inputCategory = req.body.category;
    const inputSoldOut = req.body.soldOut;
    console.log("inputSoldOut: ", inputSoldOut);
    const inputImageFile = req.files;

    // 필수 입력요소 누락여부 검토
    if (!inputTitle || !inputCategory || !postId) {
      return res.status(400).send("필수 입력요소가 누락되었습니다")
    }
    // 게시글 수정 권한 여부 검토
    const postsData = await Post.findOne({ where: { id: postId } })
      .catch(err => {
        console.log(err);
        return res.statue(500).send("서버에 오류가 발생했습니다")
      })
    if (!postsData) {
      return res.status(400).send("포스트 아이디를 다시 확인해주세요")
    }
    if (result.id !== postsData.user_id) {
      return res.status(401).send("게시글의 작성자가 아닙니다")
    }
    // TODO : 어떻게 처리할 지 생각해보자 / 2차 수정완료
    // 이미지 배열 처리
    console.log(req.files);
    // 기존 저장된 이미지파일 패스 초기화/ 왜냐하면, 기존 파일들을 삭제시키기 때문
    let image1 = '';
    let image2 = '';
    let image3 = '';

    const inputImage = req.body.image;
    // inputImage Testing
    if (inputImage !== undefined) {
      console.log(inputImage.length);
      console.log(typeof inputImage)
    }

    if (inputImage !== undefined) {
      if (typeof inputImage === "string") {

        let path = __dirname + '/../uploads/' + `${userEmail}_${postId}_1`;
        let decode
        try {
          decode = Buffer.from(inputImage, 'base64');
        } catch (err) {
          return res.status(500).send("기존 업로드 파일의 디코딩에 실패했습니다")
        }

        await fs.writeFileSync(path, decode, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("파일 생성과정에서 오류가 발생했습니다")
          }
        });

        image1 = path;
      } else if (Array.isArray(inputImage)) {

        for (let i = 0; i < inputImage.length; i += 1) {
          let image = inputImage[i];
          let path = __dirname + '/../uploads/' + `${userEmail}_${postId}_${i}`;
          let decode
          try {
            decode = Buffer.from(image, 'base64');
          } catch (err) {
            console.log(err);
            return res.status(500).send("기존 업로드 파일의 디코딩에 실패했습니다")
          }

          await fs.writeFile(path, decode, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send("파일 생성과정에서 오류가 발생했습니다")
            }
          });

          if (i === 0) {
            image1 = path;
          } else if (i === 1) {
            image2 = path;
          } else if (i === 2) {
            image3 = path;
          }
        }
      } else {
        return res.status(400).send("읽을 수 없는 파일형식입니다")
      }
    }
    // inputImage = string인 경우, array인 경우, undefined인 경우
    let exImageLen;

    if (inputImage === undefined) {
      exImageLen = 0;
    } else if (typeof inputImage === "string") {
      exImageLen = 1;
    } else {
      exImageLen = inputImage.length;
    }
    // console.log("exImagelen: ", exImageLen)

    if (inputImageFile !== undefined) {
      let newImageLen = inputImageFile.length || 0
      let totalLen = exImageLen + newImageLen;

      if (totalLen > 3) {
        return res.status(400).send("이미지는 최대 3개 까지만 업로드 하실 수 있습니다")
      }
      for (let i = exImageLen; i < totalLen; i += 1) {
        if (i === 0) {
          image1 = __dirname + '/../' + inputImageFile[i - exImageLen].path;
        } else if (i === 1) {
          image2 = __dirname + '/../' + inputImageFile[i - exImageLen].path;
        } else if (i === 2) {
          image3 = __dirname + '/../' + inputImageFile[i - exImageLen].path;
        }
      }
    }
    // !! [ 시간 남을 때 리팩토링 해보자!]
    // 게시글 이미지 수정 시 기존에 업로드한 이미지파일이 있다면 삭제
    // const image1Path = postsData.image1;
    // const image2Path = postsData.image2;
    // const image3Path = postsData.image3;
    // const images = [image1Path, image2Path, image3Path];

    // for (let i = 0; i < images.length; i += 1) {
    //   if (images[i]) {
    //     fs.unlinkSync(images[i], (err) => {
    //       if (err) {
    //         console.log(err);
    //         return res.status(500).send("기존 이미지파일 삭제에 실패했습니다")
    //       }
    //     })
    //   }
    // }
    // DB 업데이트
    Post.update({
      title: inputTitle,
      content: inputContent,
      category: inputCategory,
      soldOut: inputSoldOut,
      image1,
      image2,
      image3
    }, {
      where: {
        id: postId
      }
    })
      .then(result => {
        res.status(200).json({
          user_id: postsData.user_id,
          post_id: postId,
          message: "수정 되었습니다"
        })
      })
      .catch(err => {
        res.status(500).send('서버에 오류가 발생했습니다.')
      })
  },
  // DELETE /posts/:post_id
  delete: async (req, res) => {
    console.log(req.params.post_id)
    const postId = req.params.post_id;
    //유저 권한 인증
    const result = accessFunc(req, res);
    if (!result.identified) {
      return result;
    }
    // 게시글을 삭제할 권한이 있는 지
    const userId = result.id
    const postInfo = await Post.findOne({ where: { id: postId } })
      .catch(err => {
        console.log(err);
        return res.status(500).send("서버에 오류가 발생했습니다")
      })

    if (!postInfo) {
      return res.status(400).send("포스트 아이디를 다시 확인해주세요");
    }

    console.log(postInfo)
    // 관리자라면(result.admin === true), 또는 해당 게시글의 작성자라면 삭제 가능
    // 관리자도 아니고, 해당 게시글의 작성자도 아니라면 삭제가 불가능하다.
    if (!result.admin && postInfo.user_id !== userId) {
      return res.status(401).send('해당 게시글의 작성자만이 삭제할 수 있습니다')
    } else {
      Post.destroy({ where: { id: postId } })
        .then(result => {
          // 게시글에 이미지 업로드한 파일이 있다면 삭제
          const image1Path = postInfo.image1;
          const image2Path = postInfo.image2;
          const image3Path = postInfo.image3;
          const images = [image1Path, image2Path, image3Path];

          for (let i = 0; i < images.length; i += 1) {
            if (images[i]) {
              fs.unlink(images[i], (err) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send("기존 게시글 이미지 파일을 삭제하는데 실패했습니다")
                }
              })
            }
          }
          return res.sendStatus(204)
        })
        .catch(err => {
          console.log(err);
          res.status(500).send("서버에 오류가 발생했습니다")
        })
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
    // TODO : 검색 기능
    // GET 조회 필터링 기능 추가
    // 전체 검색 ( 검색 범위 : title, content ) // 추가고려사항 : SoldOut
    if (req.query.search || req.query.category) {
      // 1. 연결 테스트
      let querySearch = req.query.search;
      let queryCategory = req.query.category;

      // 1-2 검색 범위 설정 : title, content, category
      const category = ["전체", "장난감", "보드게임", "퍼즐", "인형", "기타"];

      // 1-3 input 데이터 유효성 검증
      if (queryCategory && !category.includes(queryCategory)) {
        return res.status(400).send("Category 데이터가 유효하지 않습니다")
      }
      // 2. DB 조회
      let condition = "%" + querySearch + "%"
      console.log("condition: ", condition);
      if (!queryCategory) {
        queryCategory = null
      }
      // User 테이블 조회해서 작성자 정보 확인
      // Wish 테이블 조회해서 좋아요 등록 여부 확인
      // 2-1. Post 테이블 조회 ( User 조인 -> 작성자 정보 포함 )
     
      Post.findAll({
        where: {
          [Op.or]: {
            title: { [Op.like]: condition },
            content: { [Op.like]: condition },
            category: queryCategory
          }
        },
        include: {
          model: User,
          attributes: ['email', 'nickname']
        }
      })
        .then(async result => {
          // 검색 결과가 존재하지 않는다면 종료
          if (result.length === 0) {
            return res.status(200).send("검색결과에 해당하는 게시글이 존재하지 않습니다");
          }
          const responseData = await Promise.all(
            result.map(async post => {
              const postData = post.dataValues;
              // 게시글 이미지 파일 처리
              const { image1, image2, image3 } = postData;
              const images = [image1, image2, image3];

              postData.image = []
              for (let i = 0; i < images.length; i += 1) {
                // 이미지가 널값이 아니라면,
                if (images[i]) {
                  // console.log("images : ", images[i])
                  let buffer
                  // 비동기 처리는 try/catch로 잡아낼 수 없음
                  try { buffer = fs.readFileSync(images[i]) }
                  catch (err) {
                    console.log(err);
                    return res.status(500).send("게시글 프로필이미지를 불러올 수 없습니다")
                  }
                  bufferTostring = Buffer.from(buffer).toString('base64');
                  postData.image.push(bufferTostring);
                } else {
                  postData.image.push(images[i]);
                }
              }
              delete postData.image1;
              delete postData.image2;
              delete postData.image3;

              // 로그인 유저라면, wish 데이터 조회
              postData.wish = false;
              if (userId) {
                const wish = await Wish.findOne({
                  where: {
                    user_id: userId,
                    post_id: postData.id
                  }
                })
                  .catch(err => {
                    console.log(err);
                    return res.status(500).send("서버에 오류가 발생했습니다")
                  })
                if (wish) {
                  postData.wish = true;
                }
              }

              // 작성자 속성값 변경
              const writerInfo = postData.User;
              postData.writer = {
                writer_email: writerInfo.email,
                writer_nickname: writerInfo.nickname
              }
              delete postData.User;
              return postData
            })
          )
            .catch(err => {
              console.log(err);
              return res.status(500).send("서버에 오류가 발생했습니다")
            })
          return res.status(200).send(responseData);
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send("서버에 오류가 발생했습니다 - 필터링 구현 부분")
        })
    } else {
      // 필터링 없이 조회
      // 2. 데이터 조회
      Post.findAll()
        .then(async result => {
          if (result.length === 0) {
            return res.sendStatus(204);
          }
          // console.log(result);
          const responseData = await Promise.all(
            result.map(async post => {
              let postData = post.dataValues;

              // 게시글 이미지 파일 처리
              const { image1, image2, image3 } = postData;
              const images = [image1, image2, image3];

              postData.image = []
              for (let i = 0; i < images.length; i += 1) {
                // 이미지가 널값이 아니라면,
                if (images[i]) {
                  // console.log("images : ", images[i])
                  let buffer
                  // 비동기 처리는 try/catch로 잡아낼 수 없음
                  try { buffer = fs.readFileSync(images[i]) }
                  catch (err) {
                    console.log(err);
                    return res.status(500).send("게시글 프로필이미지를 불러올 수 없습니다")
                  }
                  bufferTostring = Buffer.from(buffer).toString('base64');
                  postData.image.push(bufferTostring);
                } else {
                  postData.image.push(images[i]);
                }
              }
              delete postData.image1;
              delete postData.image2;
              delete postData.image3;

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
          // console.log(responseData);

          // 날짜 순 정렬(작성 일 기준 최신 순)
          responseData.sort((a, b) => {
            return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
          })
          res.status(200).json(responseData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send("서버에 오류가 발생했습니다")
        })
    }
  },
  // GET /posts/:post_id
  getDetail: async (req, res) => {
    console.log(req.params.post_id);
    const postId = req.params.post_id;
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
            return res.status(400).send("요청하신 회원정보와 일치하는 회원정보가 없습니다")
          }
          const { id } = userInfo;

          // 1-2. wish 여부 데이터 조회
          return Wish.findOne({
            where: {
              user_id: id,
              post_id: postId
            }
          })
            .then(result => {
              if (result) {
                return true;
              } else {
                return false;
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
      where: { id: postId },
      include: {
        model: User,
        attributes: ['email', 'nickname']
      }
    })
      .then(result => {
        if (!result) {
          return res.status(400).send("해당 게시물은 존재하지 않습니다")
        }
        console.log(result.dataValues);
        console.log(result.User.dataValues.email);

        // 2-1. 요청 데이터 정리
        const postData = result.dataValues;
        const userInfo = result.User.dataValues;
        const { id, title, content, category, soldOut, createdAt, updatedAt } = postData;
        const { email, nickname } = userInfo;

        // 2-2. 게시글 이미지 파일 처리
        // 게시글 이미지 파일 처리
        const { image1, image2, image3 } = postData;
        const images = [image1, image2, image3];

        let image = [];
        for (let i = 0; i < images.length; i += 1) {
          // 이미지가 널값이 아니라면,
          if (images[i]) {
            console.log("images : ", images[i])
            let buffer
            // 비동기 처리는 try/catch로 잡아낼 수 없음
            try { buffer = fs.readFileSync(images[i]) }
            catch (err) {
              console.log(err);
              return res.status(500).send("게시글 프로필이미지를 불러올 수 없습니다")
            }
            bufferTostring = Buffer.from(buffer).toString('base64');
            image.push(bufferTostring);
          } else {
            image.push(images[i]);
          }
        }

        return res.status(201).json({
          post_id: id,
          writer: {
            writer_email: email,
            writer_nickname: nickname
          },
          title,
          content,
          category,
          soldOut,
          image,
          createdAt,
          updatedAt,
          wish
        })
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("서버에 오류가 발생했습니다")
      })
  }
}