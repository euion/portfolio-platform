import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import AwardAdd from "./AwardAdd.js";
import AwardEdit from "./AwardEdit.js";

function Award() {
  const [isAdd, setIsAdd] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [list, setList] = useState([]);

  // 목데이터를 불러와 list에 저장하는 함수
  async function data() {
    const response = await axios.get("http://localhost:3000/data/award.json");
    const result = await response.data;
    setList(result);
  }

  useEffect(() => {
    data();
  }, []);

  return (
    <Card className="ml-5">
      <Row className="justify-content-md-center m-3">
        <Form>
          <Form.Label style={{ fontSize: "25px" }}>수상 이력</Form.Label>
          <Form>
            {/* 목데이터에서 불러온 리스트를 .map함수를 활용하여 각각의 수상 이력을 출력 */}
            {list.map((value, index) => (
              <div style={{ margin: "20px 0px" }}>
                {/* isEdit이 false일 경우 수상이력출력, true일 경우 수정 컴포넌트 출력 */}
                {selectedIndex === index ? (
                  <AwardEdit
                    setIsEdit={setSelectedIndex}
                    list={list}
                    setList={setList}
                    value={value}
                    index={index}
                  />
                ) : (
                  <div>
                    <div>{value.title}</div>
                    <div style={{ color: "rgb(100,100,100)" }}>{value.content}</div>
                    <Button onClick={() => setSelectedIndex(index)}>edit</Button>{" "}
                    <Button
                      onClick={() => {
                        setList(
                          list.filter((list) => {
                            return list.id != value.id;
                          })
                        );
                      }}
                    >
                      delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </Form>
          {/* isAdd이 true일 경우 추가 컴포넌트 출력 */}
          {isAdd ? (
            <AwardAdd setIsAdd={setIsAdd} list={list} setList={setList} />
          ) : (
            <> </>
          )}
          <Form.Group as={Row} className="mt-3 text-center">
            <Col>
              <Button onClick={() => setIsAdd(true)}>+</Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Card>
  );
}

export default Award;
