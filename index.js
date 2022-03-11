const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const config = require("./config/key");
// 2021이후 body-parser 설치 안해도됨(아래코드 작성)
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 안녕 노드몬!");
});

app.post("/register", (req, res) => {
  // 회원가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    // req.body있는 정보들이 user에 저장됨
    if (err) return res.json({ success: false, err }); // err가 있으면 client에 에러가 있다고 json형식으로 전달
    return res.status(200).json({
      // err가 없고 성공했으면 true로 전달
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
