import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";
import Certificates from "./Certificates";

function CertificateEditForm({
  setIsEditing,
  certificate,
  certificateList,
  setCertificateList,
}) {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [date, setDate] = useState(new Date(certificate.date));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const when_date = date;
    // .toISOString().split("T")[0]
    const user_id = certificate.user_id;
    const certificate_id = certificate.id;
    // const current = {
    //   id: certificate.id,
    //   title,
    //   description,
    //   when_date,
    // };
    // const newList = [...certificateList];
    // console.log(newList);

    // const findIndex = newList.findIndex((element) => element.id === current.id);
    // console.log(findIndex);

    // newList[findIndex] = current;
    // setCertificateList(newList);

    await Api.put(`certificates/${certificate_id}`, {
      // certificate_id,
      title,
      description,
      when_date,
    });
    const res = await Api.get("certificatelist", certificate_id);
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
