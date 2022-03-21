import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import Landing from "../../views/LandingPage/Landing.css";
import MainImage from "../../views/LandingPage/Sections/MainImage";
import GridCards from "../commons/GridCards";

// 환경변수
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../../Config";
import { Row, Button } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);

  const [MainMovieImage, setMainMovieImage] = useState(null);

  const [CurrentPage, setCurrentPage] = useState(0);
  // Landing페이지 켜지면 실행
  // 무비 API에서 인기있는 영화 정보 가져오기 (1페이지에 있는것만)
  useEffect(() => {
    // 1페이지에 있는 20개 영화 endPoint에 저장
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endPoint);
  }, []);

  // endPoint를 받음
  const fetchMovies = (endPoint) => {
    fetch(endPoint)
      .then((response) => response.json())
      // .then((response) => console.log(response));
      .then((response) => {
        setMovies([...Movies, ...response.results]); // 인기 영화 리스트 저장
        setMainMovieImage(response.results[0]); // 인기 1순위 저장
        setCurrentPage(response.page);
        console.log(response);
      });
  };

  // LoadMore 클릭시 실행
  const onLoadMoreItem = () => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;

    fetchMovies(endPoint);
  };

  return (
    <div className="LandingPage">
      {/* Main Image */}
      {/* 이미지 사이즈 및 1순위 영화 이미지 가져오기 */}
      {/* 이미지 가져오기 전에 렌더를 해버려 에러가남 MainMovieImage를 가져오면? 렌더하기  */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          description={MainMovieImage.overview}
        />
      )}

      <div className="Movies_latest">
        <h2>최신 영화 리스트</h2>
        <hr />

        {/* Movie Grid Cards */}
        <Row>
          {Movies &&
            Movies.map((movie, idx) => (
              <React.Fragment key={idx}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id} // 영화정보로 들어갈때 고유의 id를 통해 들어가기 위해 설정
                  movieName={movie.original_title}
                  description={movie.overview}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div className="site-button-ghost-wrapper loadBtn">
        <Button className="Load-Btn" type="primary" onClick={onLoadMoreItem}>
          Load More
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
