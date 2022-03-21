const express = require("express");
const app = express();
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const config = require("./server/config/key");
// 2021이후 body-parser 설치 안해도됨(아래코드 작성)
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 안녕 노드몬!");
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요~");
});

app.post("/api/users/register", (req, res) => {
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

// 클라에서 로그인하면 정보 보내주고 찾기
app.post("/api/users/login", (req, res) => {
  // 1. 요청된 이메일 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 2. 이메일이 DB에 있다면? 비밀번호는 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        // 비번이 같지 않으면
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 3. 비밀번호까지 맞다면 토큰을 생성하여, 로그인 성공 메세지 띄우기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키?, 로컬스트리지? 지금은 쿠키를 씀
        res
          .cookie("x_auth", user.token) // 쿠키에 이 정보가 들어감
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// #13 Auth기능 만들기

// auth라는 미들웨어에서(중간에서) 로그인 했는지 체크
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 인증이 True 라는말
  // 클라이언트에다가 인증이 True라는 정보를 전달 해줘야함
  res.status(200).json({
    _id: req.user._id, // auth에서 req.user = user 를 req에 넣었기때문
    isAdmin: req.user.role === 0 ? false : true, // 이사람이 admin유저인지? role이 0이면 -> 일반유저, 0이 아니면 관리자
    isAuth: true, // 이 사람이 로그인된 사람인지?
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  }); // 이런 정보들을 클리이언트에 전달함 어디에? user_reducer.js에 case AUTH_USER: userData: action.payload에 들어감
});

// #14 로그아웃 기능 만들기

app.get("/api/users/logout", auth, (req, res) => {
  // 로그아웃 하려는 유저의 DB에서 찾아서, auth미들웨어에서 req.user가져와 id를 찾고
  // 토큰 : '' 은 빈값으로 해서 지워줌(토큰 지워서 로그아웃 상태로 만듬)
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true, // 성공하면 teue를 보냄
    });
  });
});

// router를 이용해 코드를 나눔
app.use("/api/favorite", require("./server/routes/favorite"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//==============================================================
