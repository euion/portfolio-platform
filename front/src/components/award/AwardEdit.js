import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";

function AwardEdit({ setIsEdit, list, value }) {
  const [editTitle, setEditTitle] = useState(value.title);
  const [editContent, setEditContent] = useState(value.content);
  const [editObj, setEditObj] = useState({
    title: value.title,
    description: value.content,
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await Api.put(`awards/${value.id}`, editObj);
    const result = await response.data;
    console.log(result);
    setIsEdit(false);
  };

  function cancel() {
    setIsEdit(false);
  }

  useEffect(() => {
    setEditObj({
      id: value.id,
      title: editTitle,
      description: editContent,
    });
    console.log(list);
  }, [editTitle, editContent]);

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
