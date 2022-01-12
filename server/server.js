require('dotenv').config();
const express = require('express');
const cookie = require('cookie-parser');
const cors = require('cors');
const router = require('./routers')
const app = express();
let origin = 'http://localhost:3000'
if ( process.env.NODE_ENV === 'production' ) {
  origin = process.env.PRODUCTION_CLIENT_ORIGIN;
}
app.use(express.json());
app.use(cors({
    origin: [ origin, 'http://localhost:3000' ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  }));

app.use(cookie());
app.use('/',router);

const port = 4000
app.listen(port, () => {
  console.log(`공장 서버 ${port}에서 가동`)
})