// express 모듈 호출
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// const cors = require("cors");
// app.use(cors());

//db 연동
var pgDBConn = require('./conn');

app.get('/getList',pgDBConn.getList);

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
});