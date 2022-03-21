// const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  // movieId에 좋아요 숫자가 얼마나 되는지
  // FavoriteButton.js에서 보낸 variables를 받는방법
  // req.body를 통해 movieId를 가져옴 -> req.body.movieId;

  // 1. 몽고DB에서 favorite 숫자를 가져오기
  // models > Favorite.js > 스키마 movieId랑, FavoriteButton.js에서 보낸 movieId 정보를 찾아달라
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    // 에러날시 에러 표시
    if (err) return res.status(400).send(err);

    // 만약 3명이 이 영화(movieId)에 좋아요를 눌렀으면, [1, 2, 3]이렇게 데이터가 저장되어 info에 들어있음

    // 2. 그 다음 성공하면 info를 프론트에 다시 숫자정보 보내주기
    // info.length해주면 3명이 이 영화를 좋아했다 라는 정보를 보내줌
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
  // 해당영화id, 2개 조건에 맞는게 있으면
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false; // 내가 영화를 Favorite 리스트에 아직 넣지 않았다.

    // 영화를 추가하면
    // Favorite 리스트에 [] 값이 하나라도 있으면 result를 true로 바꿔주고
    if (info.length !== 0) {
      result = true;
    }

    // result 정보를 클라이언트에 보내줌
    res.status(200).json({ success: true, favorited: result });
  });
});

//
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);

  // save를 해주면 req.body로 받아온 variables안에 있는 모든 객체들이 favorite에 다 들어감
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getFavoredMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);

    // 성공하면 프론트에 보내줌. favorites은 사용자가 좋아요를 누른 영화들의 정보들이 Array형식으로 들어있음
    return res.status(200).json({ success: true, favorites });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndRemove({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
// router를 다른곳에도 쓸 수 있게 내보냄
