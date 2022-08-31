import React from "react";
import { Col, Row, Button } from "react-bootstrap";

import * as Api from "../../api";

function CertificateCard({
  setIsEditing,
  isEditable,
  certificate,
  setCertificateList,
  certificateList,
}) {
  const whenDate = certificate.when_date.split("T")[0];
  const handleDeleteClick = async (title) => {
    const notice = window.confirm(`[${title}] 자격증을 지우겠습니까?`);
    if (notice) {
      //Api.delete 사용하기
      await Api.delete("certificates", certificate.id);
      await Api.get(`users/${certificate.user_id}/certificates`).then((res) =>
        setCertificateList(res.data)
      );
    }
  };
  return (
    <Row>
      <Col className="mb-3" sm={8}>
        <h5>{certificate.title}</h5>
        <span>
          {certificate.description}
          <br /> {whenDate}
        </span>
      </Col>

      {isEditable && (
        <Col className="mb-3">
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
