const express = require('express');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
const cors = require('cors');
const app = express();
const router = require('./routers')

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  })
)
app.use(cookie());
app.use('/', router);

const port = 4000
app.listen(port, () => {
  console.log(`공장 서버 ${port}에서 가동`)
})