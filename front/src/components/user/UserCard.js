import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { modeContext } from "../../App";
import React, { useContext } from "react";
import { useEffect } from "react";
import { backPort } from "../../config";
import { backServer } from "../../config";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const mode = useContext(modeContext);
  const serverUrl = backServer + backPort + "/";

  return (
    <div id="card">
      <Card
        onClick={() => { isNetwork && navigate(`/users/${user.id}`) }}
        className="me-2 mb-4 mr-5 p-3"
        style={{ borderRadius: '15px', width: "100%", boxShadow: '0px 7px 7px rgba(0,0,0,0.15)' }}
        bg={mode.toLowerCase()}
        text={mode.toLowerCase() === "light" ? "dark" : "white"}
      >
        {/* {serverUrl+user?.imagePath} */}
        <Card.Body>
          <Row className="justify-content-md-center">
            <img
              style={{ height: "300px", width: "100%", objectFit: "contain" }}
              className="mt-3 mb-3"
              src={
                user?.imagePath
                  ? serverUrl + user?.imagePath
                  : `/default.png`
              }
              alt="프로필 이미지"
            />
          </Row>
          <Card.Title
            style={{ width: "100%" }}
          >{user?.name}</Card.Title>
          <Card.Subtitle
            style={{ width: "100%" }}
            className="mb-2 text-muted">{user?.email}</Card.Subtitle>
          <Card.Text
            style={{ width: "100%", height: '100px', overflow: 'scroll', scrollbarWidth: '0px' }}
          >{user?.description}</Card.Text>

          {isEditable && (
            <Col>
              <Row className="mt-3 text-center text-info">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    편집
                  </Button>
                </Col>
              </Row>
            </Col>
          )}

          {/* {isNetwork && (
          <Card.Link
            className="mt-3"
            // href=""
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )} */}
        </Card.Body>
      </Card>
    </div>

  );
}

export default UserCard;
