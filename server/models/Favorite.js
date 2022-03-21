const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Favorite Model 만들기
const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId, // User.js에 있는 userSchema의 모든 정보(딕셔너리)들을 가져옴
      ref: "User", // ref를 User로 지정 해줘야 위에를 쓸 수 있음
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };

// Favorite을 다른곳에도 쓸 수 있게 내보냄
