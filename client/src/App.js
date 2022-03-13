import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./_components/views/LandingPage/LandingPage";
import LoginPage from "./_components/views/LoginPage/LoginPage";
import RegisterPage from "./_components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import NavBar from "./_components/views/NavBar/NavBar";

function App() {
  const NewLandingPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          {/* auth.js Auth함수에 파라미터로 Component, option, adminRoute(admin(관리자)유저만 들어가길 원하면 true)*/}
          <Route exact path="/" element={<NewLandingPage />} />
          <Route path="/login" element={<NewLoginPage />} />
          <Route path="/register/" element={<NewRegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
