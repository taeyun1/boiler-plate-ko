import React from "react";
import "./Sections/NavBar.css";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  let navigate = useNavigate();

  const user = useSelector((state) => state.user);

  // 로그아웃 버튼 누를시 실행
  const logoutHandler = () => {
    if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
      axios.get(`${USER_SERVER}/logout`).then((response) => {
        if (response.data.success === true) {
          navigate("/login");
        } else {
          alert("로그아웃 상태 입니다.");
        }
      });
    }
    return;
  };

  return (
    <nav className="NavBar">
      <div className="Nav__logo">
        <span onClick={() => navigate("/")}>로고</span>
      </div>

      {/* 메뉴 컨테이너 */}
      <div className="menu__container">
        <div className="menu_left">
          <button>Favorite</button>
        </div>

        {user.userData && !user.userData.isAuth ? (
          <div className="menu_rigth__container">
            <div className="menu_rigth menu_signIn">
              <button className="signInBtn" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </div>
            <div className="menu_rigth menu_signUp">
              <button
                className="signUpBtn"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </div>
          </div>
        ) : (
          <div className="menu_rigth menu_signUp">
            <button className="signUpBtn" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
