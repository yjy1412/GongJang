require('dotenv').config();
const express = require('express');
const cookie = require('cookie-parser');
const cors = require('cors');
const router = require('./routers')
const app = express();

app.use(express.json());
app.use(cors({
    origin: [ 'http://localhost:3000', 'https://gongjang.link', 'https://www.gongjang.link' ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  }));

app.use(cookie());
app.use('/',router);

const port = 4000
app.listen(port, () => {
  console.log(`공장 서버 ${port}에서 가동`)
})
