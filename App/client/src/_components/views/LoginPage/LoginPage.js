import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";

function LoginPage(props) {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("이메일", Email);
    // console.log("패스워드", Password);

    // 사용자가 적은 이메일, 패스워드 body에 객체로 저장 후
    let body = {
      email: Email,
      password: Password,
    };

    // dispatch로 사용자 정보 loginUser함수에 전달
    // 로그인이 성공하면?
    dispatch(loginUser(body)).then((response) => {
      // userId를 로컬스토리지에 저장
      window.localStorage.setItem("userId", response.payload.userId);
      if (response.payload.loginSuccess) {
        alert("로그인 성공!");
        navigate("/"); // 시작페이지로 이동
      } else {
        alert("Error 로그인 정보가 맞지 않습니다.");
      }
    });
  };

  return (
    <div className="LoginPage">
      <form onSubmit={onSubmitHandler}>
        <h2>Log In</h2>
        <input
          type={"email"}
          value={Email}
          onChange={onEmailHandler}
          placeholder="E-mail"
        />
        <br />
        <input
          type={"password"}
          value={Password}
          onChange={onPasswordHandler}
          placeholder="Password"
        />
        <br />
        <button className="loginBtn" type="submit">
          Log in
        </button>
        <span onClick={() => navigate("/register")} className="signUpBtn">
          Sign Up!
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
