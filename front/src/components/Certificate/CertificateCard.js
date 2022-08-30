import React from "react";
import { Col, Row, Button } from "react-bootstrap";

//자격증 내역 (이름, 설명, 날짜) isEditable이면 편집 버튼

function CertificateCard({
  setIsEditing,
  isEditable,
  certificate,
  setCertificateList,
  certificateList,
}) {
  const handleDeleteClick = (title) => {
    const notice = window.confirm(`[${title}] 자격증을 지우겠습니까?`);
    if (notice) {
      setCertificateList(
        certificateList.filter((certif) => certif.id !== certificate.id)
      );
    }
  };
  return (
    <Row>
      <Col>
        <h5>{certificate.title}</h5>
        <p>
          {certificate.description}
          <br /> {certificate.date}
        </p>
      </Col>

      {isEditable && (
        <Col md={{ offset: 6 }} className="mb-3">
          <Button
            variant="outline-warning"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            수정
          </Button>
          <Button
            className="ms-2"
            variant="outline-danger"
            onClick={() => {
              handleDeleteClick(certificate.title);
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
