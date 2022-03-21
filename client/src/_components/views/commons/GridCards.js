import React from "react";
import { Col } from "antd";
import { Card } from "antd";
import grid from "../commons/grid.css";
import { useNavigate } from "react-router-dom";

function GridCards(props) {
  const { Meta } = Card;

  const navigate = useNavigate();

  // 영화 클릭시 해당 영화 고유ID를 전달하여 이동
  const onMovieLink = () => {
    navigate(`/movie/${props.movieId}`);
  };

  if (props.landingPage) {
    return (
      <div className="GridCards" onClick={onMovieLink}>
        <Card
          className="GridCards-Card"
          style={{ width: 150 }}
          hoverable
          cover={
            <img
              style={{ width: "100%", height: 200 }}
              alt={props.movieName}
              src={props.image}
            />
          }
        >
          <Meta
            className="Grid-Meta"
            title={props.movieName}
            description={props.description}
          />
        </Card>
      </div>
    );
  } else {
    return (
      <div className="GridCards GridCards-Actor">
        <Card
          className="GridCards-Card GridCards-Card-Actor"
          style={{ width: 150 }}
          hoverable
          cover={
            <img
              style={{ width: "100%", height: 200 }}
              alt={props.characterName}
              src={props.image}
            />
          }
        >
          <Meta
            className="Grid-Meta Grid-Meta_Actor"
            title={props.characterName}
            description={props.original_name}
          />
        </Card>
      </div>
    );
  }
}

{
  /* <div>
        <a href={`/movie/${props.movieId}`}>
          <img src={props.image} alt={props.movieName} />
        </a>
      </div> */
}
export default GridCards;
