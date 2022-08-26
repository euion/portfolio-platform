import { useState, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function AwardAdd({ setIsAdd, setList, list }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nextId = useRef(3);

  function submit() {
    if (title && content) {
      setList([...list, { id: nextId.current, title, content }]);
      setTitle("");
      setContent("");
      nextId.current += 1;
      alert("추가 되었습니다.");
    } else alert("내용을 입력해주세요.");
    setIsAdd(false);
  }

  function cancel() {
    setIsAdd(false);
  }

  return (
    <Form>
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

      <Form.Group as={Col} className="text-center m-3">
        <Row>
          <Col>
            <Button variant="primary" onClick={submit}>
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
