import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

function CertificateAddForm({
  isAdding,
  setIsAdding,
  certificateList,
  setCertificateList,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  //event객체만 ..
  const handleSubmit = (e) => {
    e.preventDefault();
    const stringDate = date.toISOString().split("T")[0];
    const newCertificate = {
      id: certificateList.length,
      title: title,
      description: description,
      date: stringDate,
    };

    setCertificateList([...certificateList, newCertificate]);
    setTitle("");
    setDescription("");
    setDate(new Date());
    setIsAdding(false);
    return;
  };

  //컨테이너로 센터

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
                  mask={"____-__-__"}
                  type="date"
                  shouldCloseOnSelect={true}
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
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                      }}
                    >
                      취소
                    </Button>
                  </Col>
                </Row>
                {/* 클릭하면 그냥 다시 +버튼으로 돌아가게끔 */}
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
