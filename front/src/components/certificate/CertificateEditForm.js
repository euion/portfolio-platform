import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";

function CertificateEditForm({
  setIsEditing,
  certificate,
  setCertificateList,
}) {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [date, setDate] = useState(new Date(certificate.when_date));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = certificate.user_id;
    const certificate_id = certificate.id;
    console.log(certificate_id);

    //수정
    await Api.put(`certificates/${certificate_id}`, {
      title,
      description,
      when_date: date,
    });
    const res = await Api.get(`users/${user_id}/certificates`);
    setCertificateList(res.data);

    setIsEditing(false);
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            placeholder="자격증 제목"
            className="mb-3"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></Form.Control>
          <Form.Control
            placeholder="상세내역"
            className="mb-3"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></Form.Control>
          <DatePicker
            className="mb-3"
            selected={date}
            onChange={(value) => {
              setDate(value);
            }}
          ></DatePicker>
          <Row className="text-center">
            <Col>
              <Button className="mb-3" type="submit">
                확인
              </Button>
              <Button
                className="ms-2 mb-3"
                variant="outline-primary"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                취소
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default CertificateEditForm;
