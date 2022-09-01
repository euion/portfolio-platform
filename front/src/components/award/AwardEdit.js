import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function AwardEdit({ setIsEdit, value, fetchAwardList }) {
  const [editTitle, setEditTitle] = useState(value.title);
  const [editContent, setEditContent] = useState(value.content);
  const [editHostOrganization, setEditHostOrganization] = useState(
    value.hostOrganization
  );
  const [editAwardDate, setEditAwardDate] = useState(new Date(value.awardDate));
  const [editObj, setEditObj] = useState({
    title: value.title,
    description: value.content,
    hostOrganization: value.hostOrganization,
    awardDate: value.awardDate,
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await Api.put(`awards/${value.id}`, editObj);
    setIsEdit(false);
    fetchAwardList();
  };

  function cancel() {
    setIsEdit(false);
  }

  useEffect(() => {
    setEditObj({
      title: editTitle,
      description: editContent,
      hostOrganization: editHostOrganization,
      awardDate: editAwardDate,
    });
  }, [editTitle, editContent, editHostOrganization, editAwardDate]);

  return (
    <Form onSubmit={handleEdit}>
      <Form.Group>
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상 제목을 입력하세요."
          defaultValue={value.title}
          onChange={(e) => {
            setEditTitle(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>내용</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상 내용을 입력하세요."
          defaultValue={value.description}
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>기관</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상 기관을 입력하세요."
          value={editHostOrganization}
          onChange={(e) => setEditHostOrganization(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>날짜</Form.Label>
        <DatePicker
          className="mb-3"
          selected={editAwardDate}
          onChange={(value) => {
            setEditAwardDate(value);
          }}
        ></DatePicker>
      </Form.Group>

      <Form.Group as={Col} className="text-center m-3">
        <Row>
          <Col>
            <Button type="submit" variant="primary">
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

export default AwardEdit;
