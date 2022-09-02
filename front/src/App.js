import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Api from "./api";
import { loginReducer } from "./reducer";

import Header from "./components/Header";
import LoginForm from "./components/user/LoginForm";
import Network from "./components/user/Network";
import RegisterForm from "./components/user/RegisterForm";
import Portfolio from "./components/Portfolio";
import { Button, Container } from "react-bootstrap";
import "./App.css";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const modeContext = createContext(null);

function App() {
  const [mode, setMode] = useState(localStorage.getItem("darkMode") || "Light"); //State about dark-mode

  useEffect(() => {
    localStorage.setItem("darkMode", mode);
    if (mode === "Light") {
      // 일반모드 적용 시
      document.body.style.backgroundColor = "whitesmoke";
      document.body.style.color = "#000000";
    } else {
      // 다크모드 적용 시
      document.body.style.backgroundColor = "#202020";
      document.body.style.color = "#ffffff";
    }
  }, [mode]);

  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const moveTop = () => {
    // TOP버튼 펑션
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("user/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  // 다크모드 구현
  const toggleMode = () => {
    if (mode === "Light") {
      // 다크모드 적용 시
      setMode("Dark");
    } else {
      // 일반모드 적용 시
      setMode("Light");
    }
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <modeContext.Provider value={mode}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" exact element={<Portfolio />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/users/:userId" element={<Portfolio />} />
              <Route path="/network" element={<Network />} />
              <Route path="*" element={<Portfolio />} />
            </Routes>
            <footer style={{
              boxShadow: '0px -3px 10px rgba(0,0,0,0.3)',
              paddingTop: '6px', paddingBottom: '6px', position: 'fixed', bottom: '0px', width: '100vw', backgroundColor: 'Grey', color: 'white', textAlign: 'center'
            }}>EIIIIE's - 임의연, 임동민, 임지원, 최은오, 송태원, 한혜진</footer>
          </Router>
          <Button
            onClick={toggleMode}
            variant={`outline-${mode === "Light" ? "dark" : "light"}`}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              padding: "0",
              margin: "2%",
              position: "fixed",
              right: "0",
              bottom: "100px",
            }}
          >
            {mode === "Light" ? "다크모드" : "일반모드"}
          </Button>
          <Button
            onClick={moveTop}
            variant="outline-primary"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              margin: "2%",
              position: "fixed",
              right: "0",
              bottom: "20px",
            }}
          >
            TOP
          </Button>
        </modeContext.Provider>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
