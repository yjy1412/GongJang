require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res) {
  
  const authorization = req.headers.authorization;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).send("권한인증에 실패했습니다(엑세스 토큰 부재)");
  }

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
  const { id, email, admin } = accessData;
  return { identified: true, id, email, admin }
}
