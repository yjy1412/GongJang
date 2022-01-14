require('dotenv').config();
const express = require('express');
const cookie = require('cookie-parser');
const cors = require('cors');
const router = require('./routers')
const app = express();

app.use(express.json());
// cors 옵션 설정
const allowlists = [ 'http://localhost:3000', 'https://gongjang.link', 'https://www.gongjang.link' ];
const corsOptions = {
  origin: function ( origin, callback ) {
    const isAllowlists = allowlists.indexOf(origin) !== -1;
    callback(null, isAllowlists);
  },
  credentials: true
}
app.use(cors(corsOptions));

app.use(cookie());
app.use('/',router);

const port = 4000
app.listen(port, () => {
  console.log(`공장 서버 ${port}에서 가동`)
})
