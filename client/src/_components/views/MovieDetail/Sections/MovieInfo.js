import { Descriptions } from "antd";
import React from "react";
import MovieDetail from "../MovieDetail";
import movieinfo from "../Sections/movieinfo.css";

function MovieInfo(props) {
  let { movie } = props;

  return (
    <Descriptions title="영화 정보" bordered>
      <Descriptions.Item label="제목">{movie.original_title}</Descriptions.Item>
      <Descriptions.Item label="출시일">{movie.release_date}</Descriptions.Item>
      <Descriptions.Item label="수익">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="런타임">{movie.runtime}분</Descriptions.Item>
      <Descriptions.Item label="총 점수" span={2}>
        {movie.vote_average} 점
      </Descriptions.Item>

      <Descriptions.Item label="투표 수">
        {movie.vote_count}명
      </Descriptions.Item>
      <Descriptions.Item label="상태">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="인기">{movie.popularity}</Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;
