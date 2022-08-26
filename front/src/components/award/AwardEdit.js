import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function AwardEdit({ setIsEdit, list, setList, value, index }) {
  const [editTitle, setEditTitle] = useState(value.title);
  const [editContent, setEditContent] = useState(value.content);
  const [editObj, setEditObj] = useState({
    id: value.id,
    title: value.title,
    content: value.content,
  });

  function cancel() {
    setIsEdit(false);
  }

  useEffect(() => {
    setEditObj({
      id: value.id,
      title: editTitle,
      content: editContent,
    });
    console.log(list);
  }, [editTitle, editContent]);

  return (
    <Form>
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
          defaultValue={value.content}
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group as={Col} className="text-center m-3">
        <Row>
          <Col>
            <Button
              variant="primary"
              onClick={() => {
                const tempList = [...list];
                tempList[index] = { ...editObj };
                setList(tempList);
                setIsEdit(false);
              }}
            >
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
