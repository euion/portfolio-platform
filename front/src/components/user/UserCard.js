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
    <Card
      className="mb-2 mr-5"
      style={{ width: "18rem" }}
      bg={mode.toLowerCase()}
      text={mode.toLowerCase() === "light" ? "dark" : "white"}
    >
      {/* {serverUrl+user?.imagePath} */}
      <Card.Body>
        <Row className="justify-content-md-center">
          <img
            style={{ height: "15rem", width: "15rem", objectFit: "contain" }}
            className="mt-3 mb-3"
            src={
              user?.imagePath
                ? serverUrl + user?.imagePath
                : "https://ibb.co/3pBkZXq"
            }
            alt="프로필 이미지"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

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

        {isNetwork && (
          <Card.Link
            className="mt-3"
            // href=""
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
