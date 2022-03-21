import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_action";

// 이 코드는 App.js에 import해줌 import할 이름은 Auth로
export default function (SpecificComponent, option, adminRoute = null) {
  // option은 3개의 옵션이 있음
  // null => 아무나 출입 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입 불가능한 페이지 (로그인페이지, 회원가입페이지)

  const AuthenticationCheck = (props) => {
    let navigater = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      // 페이지가 이동할때 마다 dispatch가 작동하여, 백엔드에 요청을 줌
      // 요청 준거에 대한 response를 받음
      dispatch(auth()).then((response) => {
        // console.log(response);

        // 로그인 안한 유저가, 로그인유저만 출입가능한 페이지에 들어갈려 할때
        // 즉, payload{isAuth:false} 면
        if (!response.payload.isAuth) {
          if (option === true) {
            // option이 true인 페이지에 들어갈려고하면?
            navigater("/login"); // 로그인 페이지로 보내기
          }
        } else {
          // 로그인 한 상태
          // adminRoute가 true인데(관리자만 들어갈수 있는 페이지),
          // isAdmin은 false이면, 관리자 페이지에 못들어가게 하기
          if (adminRoute && !response.payload.isAdmin) {
            navigater("/");
          } else {
            // 로그인한 유저가, 로그인페이지나, 회원가입에 들어갈려고 하면, 시작페이지로
            if (option === false) {
              alert("로그인한 상태이므로 홈으로 돌아갑니다.");
              navigater("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  };

  return AuthenticationCheck;
}
