const fs = require('fs');

fs.readFile('postImg.png', (err, data) => {
  console.log(data)
})