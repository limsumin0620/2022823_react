// express 모듈 호출
const express = require('express');
const app = express();
// const PORT = process.env.PORT || 4000;
var pgDBConn = require('./conn.js');
pgDBConn.getUserList();
 
// http://localhost:4000/ 으로 접속 시 응답메시지 출력
app.get('/', (req,res) => {
    res.send('Server Response Success');
})
 
app.listen(4000, () => {
    console.log(`Server run : http://localhost:4000/`)
})


