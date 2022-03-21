import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

import { useNavigate } from "react-router-dom";

function RegisterPage() {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  // 회원 가입 눌렀을때,
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 비밀번호가 다르면 경고창
    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
  };

  return (
    <div className="RegisterPage LoginPage">
      <form onSubmit={onSubmitHandler}>
        <h2>Sign up</h2>
        <label>
          <span className="star">* </span>Name
        </label>
        <input
          type={"text"}
          value={Name}
          onChange={onNameHandler}
          placeholder="Enter your name"
        />
        <label>
          <span className="star">* </span>Email
        </label>
        <input
          type={"email"}
          value={Email}
          onChange={onEmailHandler}
          placeholder="Enter your Email"
        />

        <label>
          <span className="star">* </span>Password
        </label>
        <input
          type={"password"}
          value={Password}
          onChange={onPasswordHandler}
          placeholder="Enter your password"
        />
        <label>
          <span className="star">* </span>Confirm Password
        </label>
        <input
          type={"password"}
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          placeholder="Enter your confirmPassword"
        />
        <br />
        <button className="loginBtn" type="submit">
          Submit!
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
