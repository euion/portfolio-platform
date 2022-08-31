import { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import AwardAdd from "./AwardAdd.js";
import AwardEdit from "./AwardEdit.js";
import * as Api from "../../api";
import { modeContext } from "../../App";

function Award({ portfolioOwnerId, isEditable }) {
  const [isAdd, setIsAdd] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [isRander, setIsRander] = useState(false); // useEffect에서 의존성배열에 삽입하여 이 값이 변할 때 마다 재렌더링
  const [list, setList] = useState([]);
  const mode = useContext(modeContext);

  // 목데이터를 불러와 list에 저장하는 함수
  async function data() {
    const response = await Api.get(`users/${portfolioOwnerId}/awards`);
    const result = await response.data;
    setList(result);
    console.log(result);
  }

  useEffect(() => {
    data();
  }, [isRander]);

  // 수상내역 삭제 함수
  const handleDelete = async (value) => {
    setIsRander(true);
    // alert(`${value.title} 수상내역을 지우시겠습니까?`);
    const response = await Api.delete(`awards/${value.id}`);
    const result = response.data;
    console.log(result);
    setIsRander(false);
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
                    list={list}
                    setList={setList}
                    value={value}
                    index={index}
                    setIsRander={setIsRander}
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
                    <Col sm={4}>
                      <Button
                        variant="outline-danger"
                        onClick={() => setSelectedIndex(index)}
                      >
                        수정
                      </Button>{" "}
                      <Button
                        variant="outline-warning"
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
          <AwardAdd
            setIsAdd={setIsAdd}
            list={list}
            setList={setList}
            setIsRander={setIsRander}
          />
        ) : (
          <> </>
        )}

        {isEditable ? (
          <Form.Group as={Row} className="mt-3 text-center">
            <Col>
              <Button onClick={() => setIsAdd(true)}>+</Button>
            </Col>
          </Form.Group>
        ) : (
          <></>
        )}
      </Form>
    </Card>
  );
}

export default Award;
