import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("user/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("users").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container style={{ paddingTop: "110px", paddingBottom: "110px" }}>
      <Row xs="auto" className="jusify-content-center">


        {users.map((user) => (
          <Col key={user.id} xs={12} sm={6} md={4} lg={3} ><UserCard user={user} isNetwork /></Col>
        ))}
      </Row>
    </Container >
  );
}

export default Network;
