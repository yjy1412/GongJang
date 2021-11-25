const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();




app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  })
)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/', (req, res) =>{
  res.send(req.body)
})



const port = 4000
app.listen(port, () => {
  console.log(`공장 서버 ${port}에서 가동`)
})