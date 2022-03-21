import React, { useState, useEffect } from "react";
import axios from "axios";
import favoritepage from "../FavoritePage/favoritepage.css";
import { Button, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IMAGE_BASE_URL } from "../../../Config";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function FavoritePage() {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    // 유저가 로그인을 안했으면?
    if (user.userData && !user.userData.isAuth) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }

    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios
      .post("/api/favorite/getFavoredMovie", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          console.log(response.data.favorites);
          setFavorites(response.data.favorites);
        } else {
          alert("영화 정보를 가져오는데 실패 했습니다.");
        }
      });
  };

  const onRemove = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    axios
      .post("/api/favorite/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("리스트에서 지우는데 실패했습니다.");
        }
      });
  };

  const renderCards = Favorites.map((favorite, idx) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          <img src={`http://geojecci.korcham.net/images/no-image01.gif`} />
        )}
      </div>
    );

    return (
      <tr key={idx}>
        <td>
          {favorite.movieTitle}
          <Popover content={content} title={`${favorite.movieTitle}`}>
            &nbsp;&nbsp;
            <SearchOutlined className="search" />
          </Popover>
        </td>

        <td>{favorite.movieRunTime}분</td>
        <td>
          <Button
            type="primary"
            danger
            onClick={() => onRemove(favorite.movieId, favorite.userFrom)}
          >
            삭제
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="FavoritePage">
      <h2> 내가 좋아하는 영화목록 </h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>영화 제목</th>
            <th>영화 런타임</th>
            <td>즐겨찾기 삭제</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
