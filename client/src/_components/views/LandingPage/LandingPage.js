import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  let navigate = useNavigate();
  // LandingPage들어오자마자 실행
  //  /api/hello get요청으로 보낸다음 서버에서 돌아오는 res를 콘솔에 출력
  // useEffect(() => {
  //   axios.get("/api/hello").then((response) => console.log(response.data));
  // }, []);

  return (
    <div className="LandingPage">
      <h2>시작 페이지</h2>
    </div>
  );
}

export default LandingPage;
