// 환경변수 process.env.NODE_ENV가 Local환경에 있으면 development모드라 나오고
// Deploy(배포)한후 에는 production이라고 나옴

// 만약 환경변수가 production이면 prod파일에서 가져오고, 그게 아니면 dev파일에서 가져온다
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
