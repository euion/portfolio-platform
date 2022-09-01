import { useState, useEffect, useContext, forwardRef } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import AwardAdd from "./AwardAdd.js";
import AwardEdit from "./AwardEdit.js";
import * as Api from "../../api";
import { modeContext } from "../../App";

function Award({ portfolioOwnerId, isEditable }) {
  const [isAdd, setIsAdd] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [list, setList] = useState([]);
  const mode = useContext(modeContext);

  // 목데이터를 불러와 list에 저장하는 함수
  async function fetchAwardList() {
    const response = await Api.get(`users/${portfolioOwnerId}/awards`);
    const result = response.data;
    setList(result);
    console.log(result);
  }

  useEffect(() => {
    fetchAwardList();
  }, []);

  // 수상 이력 삭제 함수
  const handleDelete = async (value) => {
    const ans = window.confirm(`${value.title} 수상 이력을 지우시겠습니까?`);
    if (ans) {
      const response = await Api.delete(`awards/${value.id}`);
    }
    fetchAwardList();
  };

  return (
    <Card
      className="p-3 mt-3"
      bg={mode.toLowerCase()}
      text={mode.toLowerCase() === "light" ? "dark" : "white"}
    >
      <Form as="div">
        <Form.Group>
          <h3>🏆 수상 이력</h3>
          {/* 목데이터에서 불러온 리스트를 .map함수를 활용하여 각각의 수상 이력을 출력 */}
          {list.map((value, index) => (
            <div style={{ margin: "20px 0px" }} key={index}>
              {/* isEdit이 false일 경우 수상이력출력, true일 경우 수정 컴포넌트 출력 */}
              {selectedIndex === index ? (
                isEditable ? (
                  <AwardEdit
                    setIsEdit={setSelectedIndex}
                    value={value}
                    fetchAwardList={fetchAwardList}
                  />
                ) : (
                  <></>
                )
              ) : (
                <Row>
                  <Col sm={8}>
                    <h5>{value.title}</h5> {/* 수상제목 */}
                    <p>
                      {value.description} {/* 수상내용 */} <br />
                      {value.hostOrganization} {/* 수상내용 */} <br />
                      {value.awardDate.split("T")[0]} {/* 수상내용 */}
                    </p>
                  </Col>
                  {isEditable ? (
                    <Col sm={4} className="mb-3 text-end">
                      <Button
                        variant="outline-warning"
                        onClick={() => setSelectedIndex(index)}
                      >
                        수정
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(value)}
                      >
                        삭제
                      </Button>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              )}
            </div>
          ))}
        </Form.Group>
        {/* isAdd이 true일 경우 추가 컴포넌트 출력 */}
        {isAdd ? (
          <AwardAdd setIsAdd={setIsAdd} fetchAwardList={fetchAwardList} />
        ) : (
          <> </>
        )}

        {/* 본인계정 포트폴리오만 수정가능 기능 */}
        {isEditable ? (
          <Form.Group as={Row} className="mt-3 text-center">
            {/* 수정이나 Add시 +버튼 숨김처리 */}
            {selectedIndex === false && !isAdd ? (
              <Col>
                <Button onClick={() => setIsAdd(true)}>+</Button>
              </Col>
            ) : (
              <></>
            )}
          </Form.Group>
        ) : (
          <></>
        )}
      </Form>
    </Card>
  );
}

export default Award;
