import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

function CertificateEditForm({ setIsEditing, certificate }) {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [date, setDate] = useState(new Date(certificate.date));

  const handleSubmit = (e) => {
    e.preventDefault();
    certificate.title = title;
    certificate.description = description;

    certificate.date = date.toISOString().split("T")[0];

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
            type="date"
            shouldCloseOnSelect={true}
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
                variant="secondary"
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
