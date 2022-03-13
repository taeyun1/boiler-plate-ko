const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // john ahn@naver.com 이메일 사이에 공백이 있으면 붙여주는 역할(손질)
    unique: 1, // 고유한 번호 설정
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    // 관리자
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// index.js에서 user.save하기 전에 실행
userSchema.pre("save", function (next) {
  var user = this;

  // password를 변경 할때만! 실행
  if (user.isModified("password")) {
    // bcrypt를 이용해 비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        // 암호화된 비밀번호를 만드는데 성공 했으면 user.password를 hash로 교체
        user.password = hash;
        next(); // index.js에 있는 user.save() 다음으로 보냄
      });
    });
  } else {
    next(); // password를 바꾸는게 아니라면, next()헤줘야 이 코드 실행 후 user.save다음으로 나갈수가있음
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword : 1234567 -> 암호화된 비밀번호 : $2b$10$2xYzM9CvtsIIvyDlWd8xB.46EJWUQ9fv/dxNzQ7WbZYN5R0an2JkS
  // 둘이 맞는지 비교하려면, 1234567를 암호화를 한 후  암호화된 비번과 맞는지 체크(암호화된 비밀번호를 복구할 순 없음)
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // JsonWebToken을 이용해서 토큰을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  // user._id + 'secretToken' = token // 유저id와 'secretToken'을 이용해 토큰을 만듬
  // ->										 						// 이거를 디코그 시킬때
  // 'secretToken' -> user._id       // secretToken 을 넣으면 유저 id가 됨

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 토큰을 decode한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인.
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      // 만약 에러가 있으면 콜백으로 에러를 전달해주고
      if (err) return cb(err);
      cb(null, user); // 에러가 없으면, 에러는 전달하지말고 유저정보만 전달.
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
