import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function AwardAdd({ setIsAdd, fetchAwardList }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hostOrganization, setHostOrganization] = useState("");
  const [awardDate, setAwardDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const when_date = awardDate.toISOString().split("T")[0];
    const response = await Api.post("award", {
      title,
      description: content,
      hostOrganization,
      awardDate: when_date,
    });
    setTitle(""); // 제목필드 버튼 클릭 후 제목필드 초기화
    setContent(""); // 내용필드 버튼 클릭 후 내용필드 초기화
    setIsAdd(false);
    fetchAwardList();
  };

  function cancel() {
    setIsAdd(false);
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상 제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>내용</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상 내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>기관</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상 기관을 입력하세요."
          value={hostOrganization}
          onChange={(e) => setHostOrganization(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>날짜</Form.Label>
        <DatePicker
          className="mb-3"
          selected={awardDate}
          onChange={(value) => {
            setAwardDate(value);
          }}
        ></DatePicker>
      </Form.Group>

      <Form.Group as={Col} className="text-center m-3">
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              확인
            </Button>{" "}
            <Button variant="secondary" onClick={cancel}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardAdd;
