const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리를 하는곳
  // 1.  클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth; // 토큰을 쿠키안에 넣음

  // 2. 토큰을 복호화(인간이 알기쉬운 모양)한후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    // 에러가 있으면 에러를 던져줌
    if (err) throw err;

    // 유저가 없다면?(로그인X) 클라이언트에 isAuth: false고, error는 true 있고
    if (!user) return res.json({ isAuth: false, error: true });

    // 유저가 있으면(로그인 OK),
    req.token = token; // req.token에 token을 넣어주고
    req.user = user; // req.user에 user를 넣어줌, index.js에 get auth에서 쓰기위해
    next(); //next()를 안하면 여기 코드에 갇힘. auth미들웨어로 다시 보내줘야함
  });
  // 3. 유저가 있으면 인증 Ok!
  // 4. 유저가 없으면 인증 No!
};

module.exports = { auth };
