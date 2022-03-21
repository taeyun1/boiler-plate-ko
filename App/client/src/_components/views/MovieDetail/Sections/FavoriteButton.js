import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

function FavoriteButton(props) {
  // 얼마나 많은 사람들이 이 영화를 Favorite 리스트에 넣었는지
  // 숫자 정보 얻기

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  useEffect(() => {
    // axios를 이용해 서버에 요청을 보냄
    // server > routes > favorite에 variables를 보내서 처리. 서버쪽에선 variables를 어떻게 받냐면? favorite.js에서 확인
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);

        console.log("favoriteNumber", response.data);
      } else {
        alert("숫자 정보를 가져오는데 실패 했습니다.");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((response) => {
      console.log("favorited", response.data);

      if (response.data.success) {
        setFavorited(response.data.favorited);
        console.log(response.data);
      } else {
        alert("정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  // Favorite 버튼 눌렀을때 처리
  const onFavorite = () => {
    // Favorited이 true면, 1개 이상 추가 했으면?
    if (Favorited) {
      axios
        .post("/api/favorite/removeFromFavorite", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
            console.log(FavoriteNumber);
            console.log(Favorited);
          } else {
            alert("Favorite 리스트에서 지우는 걸 실패했습니다.");
          }
        });
    } else {
      axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
          console.log(FavoriteNumber);
          console.log(Favorited);
        } else {
          alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
        }
      });
    }
  };

  return (
    <>
      <div className="FavoriteNumber">
        <p>이 영화를 좋아하는 사람들 : {FavoriteNumber}명</p>
      </div>

      <div className="FavoriteBtn-Box">
        {/* Favorited가 true면? 즉, 좋아요를 누르면?   */}
        {Favorited ? (
          <Button
            className="FavoriteBtn notGoodBtn"
            type="primary"
            ghost
            onClick={onFavorite}
          >
            별로예요 <DislikeOutlined />
          </Button>
        ) : (
          <Button
            className="FavoriteBtn GoodBtn"
            type="primary"
            onClick={onFavorite}
          >
            좋아요 <LikeOutlined />
          </Button>
        )}
      </div>
    </>
  );
}

export default FavoriteButton;
