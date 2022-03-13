import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

// 로그인 기능이나, 레지스터 기능을 만들때 사용

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }; // loginSuccess에 action.payload가 나오게

    case REGISTER_USER:
      return { ...state, register: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}
