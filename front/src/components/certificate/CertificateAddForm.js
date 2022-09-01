import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";

function CertificateAddForm({
  portfolioOwnerId,
  isAdding,
  setIsAdding,
  setCertificateList,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.post("certificate", {
      title,
      description,
      when_date: date,
    });

    const res = await Api.get(`users/${portfolioOwnerId}/certificates`);

    setCertificateList(res.data);

    setIsAdding(false);
  };

  return (
    <>
      {isAdding ? (
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  className="mb-3"
                  placeholder="자격증 제목"
                  type="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="mb-3"
                  placeholder="상세내역"
                  type="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <DatePicker
                  className="mb-3"
                  selected={date}
                  onChange={(value) => {
                    setDate(value);
                  }}
                ></DatePicker>
                <Row className="text-center">
                  <Col>
                    {title && description && date ? (
                      <Button type="submit">확인</Button>
                    ) : (
                      <Button disabled>확인</Button>
                    )}
                    <Button
                      className="ms-1"
                      variant="outline-primary"
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                      }}
                    >
                      취소
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      ) : (
        <Row className="text-center">
          <Col>
            <Button
              onClick={() => {
                setIsAdding(true);
              }}
            >
              +
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CertificateAddForm;
