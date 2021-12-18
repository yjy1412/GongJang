require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { User, Post, Wish } = require('../models');
const jwt = require('jsonwebtoken');
const accessFunc = require('./token');

module.exports = {
  // POST auth/sign-up
  signup: async (req, res) => {
    // connecting test
    console.log(req.body);

    // input data validation
    const inputEmail = req.body.email;
    const inputNickname = req.body.nickname;
    const inputPassword = req.body.password;

    if (!inputEmail || !inputNickname || !inputPassword) {
      return res.status(400).send("필수 입력요소가 누락되었습니다");
    }
    // 1. 이메일 중복여부 검사
    User.findOne({ where: { email: inputEmail } })
      .then(result => {
        if (result) {
          return res.status(400).send("이미 사용 중인 이메일입니다")
        }
        // 2. 닉네임 중복여부 검사
        User.findOne({ where: { nickname: inputNickname } })
          .then(result => {
            if (result) {
              return res.status(400).send("이미 사용 중인 닉네임입니다")
            }
            // 3. 회원가입 정보 생성
            User.create({
              email: inputEmail,
              nickname: inputNickname,
              password: inputPassword
            })
              .then(result => {
                res.status(201).send("회원가입 되었습니다")
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
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
  },
  // POST auth/log-in
  login: async (req, res) => {
    // connecting test
    // console.log(req.body);

    // input data validation
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    if (!inputEmail || !inputPassword) {
      res.status(400).send("필수 입력요소가 누락되었습니다");
    } else {
      User.findOne({
        where: {
          email: inputEmail
        }
      })
        .then(data => {
          console.log(data);
          if (!data) {
            res.status(401).send("입력하신 이메일 정보와 일치하는 회원정보가 없습니다")
          } else {
            if (data.password !== inputPassword) {
              res.status(401).send("비밀번호가 일치하지 않습니다")
            } else {
              console.log("DATA : ", data);
              const { id, email, nickname, profile_image, admin } = data.dataValues;
              const accessToken = jwt.sign(
                { id, email, admin },
                process.env.ACCESS_SECRET,
                { expiresIn: "1d" }
              );
              const refreshToken = jwt.sign(
                { id, email, admin },
                process.env.REFRESH_SECRET,
                { expiresIn: "30d" }
              )
              // token check
              console.log(accessToken);
              console.log(refreshToken);

              // response
              res.cookie("refreshToken", refreshToken, { httpOnly: true, expiresIn: "30d" })
              // 프로필 이미지 처리
              let convertImg;
              try {
                buffer = fs.readFileSync(profile_image);
                convertImg = Buffer.from(buffer).toString('base64');
              } catch {
                console.log(convertImg);
                return res.status(500).send("유저의 프로필 이미지를 불러오는데 실패했습니다")
              }
              res.json({
                accessToken: accessToken,
                userInfo: { id, email, nickname, profile_image: convertImg, admin },
                message: "로그인에 성공했습니다"
              })
            }
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).send("서버에 오류가 발생했습니다")
        })
    }
  },
  // POST auth/log-out
  logout: async (req, res) => {
    const result = accessFunc(req, res);
    // console.log(result.identified)
    if (!result.identified) {
      return result;
    }
    // console.log(result)
    try {
      if (!result) {
        return res.status(400).send('유효하지 않은 토큰입니다.')
      } else {
        res.clearCookie('refreshToken')
        res.status(200).send('로그아웃에 성공했습니다.');
      }
    } catch (err) {
      return res.status(500).send('서버에 오류가 발생했습니다.')
    }
  },
  // DELETE auth/sign-out
  signout: async (req, res) => {
    // console.log(req.headers)
    //1.유저검증(토큰여부)
    const result = accessFunc(req, res);
    console.log(result.identified)
    if (!result.identified) {
      return result;
    }
    const email = result.email

    // TODO : 시간 남는다면, 회원탈퇴 시 탈퇴 유저의 프로필 이미지 삭제하도록 구현
    //2.유저정보가 없다면 400, 있다면 204번에서 destory, 서버오류 500
    User.destroy({ where: { email: email } })
      .then(result => {
        if (!result) {
          return res.status(400).send("요청하신 회원정보와 일치하는 유저가 없습니다")
        } else {
          res.clearCookie('refreshToken')
          res.status(204).send('회원탈퇴에 성공했습니다')
        }
      })
      .catch(err => {
        return res.status(500).send('서버에 오류가 발생했습니다.')
      })
  },
  // GET auth/mypage
  getMypage: async (req, res) => {

    const result = accessFunc(req, res);
    if (!result.identified) {
      return result;
    }
    const email = result.email;

    User.findOne({ where: { email } })
      .then(userInfo => {
        console.log(userInfo);
        // 2-1. 토큰에 담긴 유저 데이터와 일치하는 데이터가 없을 때
        if (!userInfo) {
          return res.status(404).send("요청하신 회원정보와 일치하는 회원정보가 존재하지 않습니다")
        }
        // 2-2. 정상적인 조회 요청이 이루어졌을 때
        const { email, nickname, admin, profile_image } = userInfo
        // 2-3. 프로필이미지 path를 통한 이미지 데이터 전송
        // 프로필 이미지 처리
        // 프로필 이미지 처리
        let convertImg;
        try {
          buffer = fs.readFileSync(profile_image);
          convertImg = Buffer.from(buffer).toString('base64');
        } catch {
          console.log(convertImg);
          return res.status(500).send("유저의 프로필 이미지를 불러오는데 실패했습니다")
        }
        console.log(convertImg);
        res.json({
          userInfo: { email, nickname, profile_image: convertImg, admin },
          message: "회원정보 요청에 성공했습니다"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })
    // }
  },
  // GET auth/mypage/posts
  getMyPosts: async (req, res) => {
    // TODO : 이미지 처리 구현하기
    const accessResult = accessFunc(req, res);
    //사용자 인증
    if (!accessResult.identified) {
      return accessResult;
    }
    console.log(accessResult)
    const { id } = accessResult
    //accessResult는 user_id

    Post.findAll({ where: { user_id: id } })
      .then(result => {
        if (!result) {
          return res.sendStatus(204)
        } else {
          //불러올 데이터는 배열화 되어 있기 때문에 map으로 처리           
          const responseData = result.map(data => {
            const postData = data.dataValues
            // 게시글 이미지 파일 처리
            const { image1, image2, image3 } = postData;
            const images = [image1, image2, image3];

            postData.image = []

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
                postData.image.push(bufferTostring);
              } else {
                postData.image.push(images[i]);
              }
            }
            delete postData.image1;
            delete postData.image2;
            delete postData.image3;
            return postData
          })
          responseData.sort((a, b) => {
            return Number(new Date(b.createdAt) - Number(new Date(a.createdAt)))
          })
          return res.status(200).json(responseData)
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('서버에 오류가 발생했습니다.')
      })
  },
  // GET auth/wish-list
  getWishLists: async (req, res) => {
    // TODO : 이미지 처리 구현하기
    // 0. 연결 테스트
    console.log(req.params.user_email);
    const userEmail = req.params.user_email;

    // 1. 권한 인증
    const accessResult = accessFunc(req, res);

    if (!accessResult.identified) {
      return accessResult;
    }
    const { id, email } = accessResult;

    // 2. 자료 조회
    Wish.findAll({
      where: { user_id: id },
      include: {
        model: Post,
        attributes: ['id', 'title', 'image1', 'category', 'soldOut', 'createdAt']
      }
    })
      .then(async result => {
        if (!result) { res.sendStatus(204) }
        const responseData = await Promise.all(
          result.map(data => {
            const postData = data.dataValues.Post.dataValues;
            postData.wish = true;
            // 게시글 이미지 파일 처리
            const { image1 } = postData;

            if ( image1 ) {
              console.log("images : ", image1)
              let buffer
              // 비동기 처리는 try/catch로 잡아낼 수 없음
              try { buffer = fs.readFileSync(image1) }
              catch (err) {
                console.log(err);
                return res.status(500).send("게시글 프로필이미지를 불러올 수 없습니다")
              }
              bufferTostring = Buffer.from(buffer).toString('base64');
              console.log('bufferTostring: ', bufferTostring);
              postData.image1 = bufferTostring
            } 
            return postData;
          })
        )
        console.log(responseData)
        if (!responseData) {
          res.status(500).send("서버에 에러가 발생했습니다")
        }
        // 날짜 순 정렬(작성 일 기준 최신 순)
        responseData.sort((a, b) => {
          return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
        })
        return res.status(200).json(responseData)
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("서버에 오류가 발생했습니다")
      })

  },
  // PATCH auth/nickname
  patchNickname: async (req, res) => {
    // 1. 권한 인증
    const result = accessFunc(req, res);

    if (!result.identified) {
      return result;
    }
    const email = result.email;

    // 2. 입력 데이터 DB 반영
    const inputNickname = req.body.nickname;
    // const inputProfileImage = req.file;
    // console.log(inputProfileImage);

    if (inputNickname === "") {
      // !! null과 ""의 차이가 뭘까??
      return res.status(400).send("닉네임을 작성해주세요")
    }
    // 2-1. 닉네임 중복여부 검사
    User.findOne({ where: { nickname: inputNickname } })
      .then(result => {
        if (result) {
          return res.status(400).send("이미 사용 중인 닉네임입니다")
        };
        // 2-2. 회원정보 수정 반영
        User.update({
          nickname: inputNickname
          // profile_image: inputProfileImage
        }, { where: { email } })
          .then(result => {
            console.log(result);
            res.status(200).send("닉네임이 변경 되었습니다")
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
  // PATCH auth/profile-image
  patchProfileImg: async (req, res) => {
    // 권한 인증
    const accessResult = accessFunc(req, res);

    if (!accessResult.identified) {
      return accessResult;
    }
    const { email } = accessResult;

    // 입력 데이터 DB 반영
    // 변경 요청할 프로필 이미지가 없다면,
    if (!req.file) {
      // 디폴트 이미지 파일이 아니라면, 기존 유저의 프로필 이미지 파일 삭제
      User.findOne({ where: { email } })
        .then(result => {
          const userInfo = result.dataValues;
          const preProfileImgPath = userInfo.profile_image;
          // 디폴트 이미지가 아니라면,
          if (!/source/g.exec(preProfileImgPath)) {
            fs.unlinkSync(preProfileImgPath, (err, data) => {
              if (err) {
                console.log(err);
                return res.status(500).send("기존 프로필 사진 삭제에 실패했습니다")
              }
            })
          }
          // 4. DB 업데이트
          User.update({
            profile_image: __dirname + '/../source/profileImg.jpg'
          }, { where: { email } })
            .then(result => {
              console.log("updateResult: ", result);
              return res.status(200).send("프로필 이미지가 업로드 되었습니다")
            })
            .catch(err => {
              console.log(err);
              return res.status(500).send("DB 업데이트에 오류가 발생했습니다")
            })
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send("서버에 오류가 발생했습니다");
        })
    } else {
      const inputProfileImage = req.file;
      const imgPath = inputProfileImage.path
      console.log("req.file: ", inputProfileImage);
      console.log("req.file.path: ", imgPath);
      console.log("req.body: ", req.body);

      // 3. 기존 프로필 이미지 삭제
      User.findOne({ where: { email } })
        .then(result => {
          const userInfo = result.dataValues;
          const preProfileImgPath = userInfo.profile_image;
          // 3-1. 디폴트 이미지가 아니라면, 프로필 이미지 변경 시 기존 파일 삭제
          if (!/source/g.exec(preProfileImgPath)) {
            fs.unlinkSync(preProfileImgPath, (err, data) => {
              if (err) {
                console.log(err);
                return res.status(500).send("기존 프로필 사진 삭제에 실패했습니다")
              }
            })
          }
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send("서버에 오류가 발생했습니다");
        })

      // 4. DB 업데이트
      User.update({
        profile_image: __dirname + '/../' + `${imgPath}`
      }, { where: { email } })
        .then(result => {
          console.log("updateResult: ", result);
          return res.status(200).send("프로필 이미지가 업로드 되었습니다")
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send("DB 업데이트에 오류가 발생했습니다")
        })
    }
  },
  // PATCH auth/password
  patchPassword: async (req, res) => {
    // 1. 권한 인증
    const result = accessFunc(req, res);

    if (!result.identified) {
      return result;
    }
    const email = result.email;
    // 2. 입력된 current 비밀번호 확인
    User.findOne({ where: { email } })
      .then(userInfo => {
        // 2-1. 일치하는 유저정보가 존재하지 않을 때
        if (!userInfo) {
          return res.status(401).send("요청하신 회원정보와 일치하는 회원정보가 존재하지 않습니다")
        }

        const { password } = userInfo.dataValues;
        const inputCurrentPassword = req.body.current;
        const inputNewPassword = req.body.new;

        // 2-2. 입력된 비밀번호가 이전 비밀번호와 다를 때
        if (inputCurrentPassword !== password) {
          return res.status(401).send("비밀번호가 틀렸습니다")
        }
        // 2-3 정상적인 요청 결과
        User.update({ password: inputNewPassword }, {
          where: { email }
        })
          .then(result => {
            res.status(200).send("회원님의 비밀번호가 정상적으로 수정되었습니다")
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
  //POST auth/google/log-in
  googleLogin: async (req, res) => {
    //서버에서는 authorization code(=code로 통칭)를 받아서 oauth에 code를 post해줘야 한다.
    const {code} = req.body

    const authUrl = "https://accounts.google.com/o/oauth2/auth";
    const tokenUrl = 'https://oauth2.googleapis.com/token'
    const infoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const reUri = process.env.GOOGLE_REDIRECT_URI    
    const client_id =process.env.GOOGLE_CLIENT_ID
    const client_secret = process.env.GOOGLE_CLIENT_PASSOWRD     
    const client_uri = process.env.GOOGLE_CLIENT_URI
    const grant_type = "authorization_code"
    

    if(!code) {
      return res.status(401).send('권한이 없습니다.')
    }
  
   try{
    await axios.post(tokenUrl, { //1.구글 오쓰 서버에 요청해서 토큰을 받아옴
      code : code,
      client_id : client_id,
      client_secret : client_secret,
      redirect_uri : client_uri, //얘는 또 왜 3000번으로 받아야 정상작동 될까. CODE는 4000번으로 받았고 리디렉은 3000번으로 가는게 맞나? 
      grant_type : grant_type
    })
    .then(async data => { //2. 토큰을 받아왔음
      const {access_token} = data.data
      // console.log(data.data) //토큰 정확하게 받아와짐
      //이제 이 토큰으로 유저인포를 받아올 거임
      await axios
        .get(infoUrl, { 
          headers : {
            authorization : `Bearer ${access_token}`
          }
        })
        .then(async data => { //3. 토큰으로 유저 정보를 보고 있음. data는 userInfo를 담고 있음 
          const googleEmail = data.data.email
          const googleName = data.data.name
          console.log(data)

          const isUser = await User.findOrCreate({
            where : {
              email : googleEmail
            },
            defaults : {
              email : googleEmail,
              nickname : googleName,
            }
          }).then(data => { //여기서 data는 find에 성공하면 find 된 값을 보내준다. find가 안되면 create해주고 그 data이다.
            console.log(data)
            const { id, email, nickname, profile_image, admin} = data[0].dataValues          

            const accessToken = jwt.sign(
              {id, email, admin},
              process.env.ACCESS_SECRET,
              {expiresIn : "1d"}
            );
            const refreshToken = jwt.sign(
              {id, email, admin},
              process.env.REFRESH_SECRET,
              {expiresIn : "30d"}
            );
             let convertImg;
             try {
               buffer = fs.readFileSync(profile_image); //절대 경로가 들어가있는 데이터
               convertImg = Buffer.from(buffer).toString('base64');
             } catch {
               console.log(convertImg);
               return res.status(500).send("유저의 프로필 이미지를 불러오는데 실패했습니다")
             }
              res.cookie("refreshToken", refreshToken, {httpOnly : true, expiresIn : "30d"})
              res.status(200).json({
                accessToken: accessToken,
                userInfo: { id, email, nickname, profile_image: convertImg, admin },
                message: "로그인에 성공했습니다"
              })
           })  
        })             
    })  
   } catch(err) {
     return res.status(500).send('서버에 오류가 발생했습니다.')
   } 
}
}