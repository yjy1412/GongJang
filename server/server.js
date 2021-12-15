require('dotenv').config();

const express = require('express');
const cookie = require('cookie-parser');
const cors = require('cors');

const router = require('./routers')
const app = express();
const NODE_ENV = process.env.NODE_ENV;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const PRODUCT_CLIENT_ORIGIN = process.env.PRODUCT_CLIENT_ORIGIN;
let origin = CLIENT_ORIGIN;
if ( NODE_ENV === 'production' ) {
  origin = PRODUCT_CLIENT_ORIGIN
}

app.use(express.json())
app.use(
  cors({
    origin: origin,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  })
)
app.use(cookie());
app.use('/',router);

const port = 4000
app.listen(port, () => {
  console.log(`공장 서버 ${port}에서 가동`)
})