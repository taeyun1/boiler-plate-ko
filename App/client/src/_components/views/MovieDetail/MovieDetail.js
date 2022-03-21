import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import movieinfo from "./Sections/movieinfo.css";

import { Row, Button } from "antd";
import GridCards from "../commons/GridCards";
import FavoriteButton from "./Sections/FavoriteButton";

function MovieDetail() {
  let { movieId } = useParams(); // url을 통해 영화id를 가져옴

  const [Movie, setMovie] = useState([]);

  const [Casts, setCasts] = useState([]);

  const [ActorToggle, setActorToggle] = useState(false);

  const onActorToggle = () => {
    setActorToggle(!ActorToggle);
  };

  // 특정 영화 상세정보 가져오기
  useEffect(() => {
    console.log(movieId);
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log("해당 영화Info", response);
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        console.log("출연진들", response);
        setCasts(response.cast);
      });
  }, []);

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        description={Movie.overview}
      />

      {/* Body */}

      <div className="FavoriteBtn-container">
        <FavoriteButton
          movieInfo={Movie}
          movieId={movieId}
          userFrom={localStorage.getItem("userId")}
        />
      </div>

      {/* Movie Info */}

      <MovieInfo movie={Movie} />

      <br />

      {/* Actors Grid */}

      {ActorToggle ? (
        <div className="site-button-ghost-wrapper loadBtn">
          <Button className="Load-Btn" type="primary" onClick={onActorToggle}>
            접기
          </Button>
        </div>
      ) : (
        <div className="site-button-ghost-wrapper loadBtn">
          <Button className="Load-Btn" type="primary" onClick={onActorToggle}>
            출연진 보기
          </Button>
        </div>
      )}

      {ActorToggle && (
        <Row>
          {Casts &&
            Casts.map((cast, idx) => (
              <React.Fragment key={idx}>
                {
                  // 배우 사진이 없으면? NoImage표시
                  cast.profile_path === null ? (
                    <GridCards
                      image={`http://geojecci.korcham.net/images/no-image01.gif`}
                      characterName={cast.character}
                      original_name={cast.name}
                      profile={cast.profile_path}
                    />
                  ) : (
                    // 배우 사진이 있으면 있는거 표시
                    <GridCards
                      image={`${IMAGE_BASE_URL}w500${cast.profile_path}`}
                      characterName={cast.character}
                      original_name={cast.name}
                      profile={cast.profile_path}
                    />
                  )
                }
              </React.Fragment>
            ))}
        </Row>
      )}
    </div>
  );
}

export default MovieDetail;
