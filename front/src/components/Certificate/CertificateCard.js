import React from "react";
import { Col, Row, Button, Card } from "react-bootstrap";

//자격증 내역 (이름, 설명, 날짜) isEditable이면 편집 버튼

function CertificateCard({
  setIsEditing,
  isEditable,
  certificate,
  setCertificateList,
  certificateList,
}) {
  return (
    <Row>
      <Col sm={10} className="mb-3 ms-3">
        <Card.Subtitle className="mb-2">{certificate.title}</Card.Subtitle>
        <Card.Text className="mb-2">
          {certificate.description}
          <br />
          {certificate.date}
        </Card.Text>
      </Col>

      {isEditable && (
        <Col sm className="mb-3">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            편집
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="ms-2"
            onClick={() => {
              setCertificateList(
                certificateList.filter((certif) => certif.id !== certificate.id)
              );
            }}
          >
            삭제
          </Button>
        </Col>
      )}
    </Row>
  );
}

export default CertificateCard;
