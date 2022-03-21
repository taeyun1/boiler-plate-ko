import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

// 로그인
// 사용자 정보 body는 전달하여 dataToSubmit에 들어옴
export function loginUser(dataToSubmit) {
  // 사용자 정보 서버로 보내기
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  // 타입이 LOGIN_USER인 reducer로 보냄, request랑 같이
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

// 회원가입 기능
export function registerUser(dataToSubmit) {
  // 사용자 정보 서버로 보내기
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  // 타입이 REGISTER_USER인 reducer로 보냄, request랑 같이
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

// get요청이니까 파라미터 필요없음
export function auth() {
  // 사용자 정보 서버로 보내기
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  // 타입이 REGISTER_USER인 reducer로 보냄, request랑 같이
  return {
    type: AUTH_USER,
    payload: request,
  };
}
