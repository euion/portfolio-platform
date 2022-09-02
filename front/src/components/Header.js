import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <Nav id='nav' style={{ backgroundColor: '#0d6efd', position: 'fixed', top: '0', width: '100vw', zIndex: '1000', boxShadow: '0px 7px 7px rgba(0,0,0,0.3)' }} activeKey={location.pathname}>
      <Nav.Item className="me-auto">
        <Nav.Link >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ color: 'white', fontWeight: '600' }} onClick={() => navigate(`/`)}><span>Portfolio</span></h1>
            <span className='ms-3' style={{ fontSize: '1.1em', color: 'rgba(255,255,255,0.9)' }} >포트폴리오 공유 서비스</span>
          </div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate(`/`)} style={{ fontWeight: '600', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', height: '100%' }}><span>나의 페이지</span></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ fontWeight: '600', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', height: '100%' }} onClick={() => navigate("/network")}><span>네트워크</span></Nav.Link>
      </Nav.Item>
      {isLogin && (
        <Nav.Item>
          <Nav.Link style={{ fontWeight: '600', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', height: '100%' }} className='me-4' onClick={logout}><span>로그아웃</span></Nav.Link>
        </Nav.Item>
      )
      }
    </Nav >
  );
}

export default Header;
