import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import AwardAdd from "./AwardAdd.js";
import AwardEdit from "./AwardEdit.js";
import * as Api from "../../api";

// import { useSelector, useDispatch } from "react-redux";
// import { modeReducer } from "../../reducer";

function Award({ portfolioOwnerId, isEditable, mode }) {
  const [isAdd, setIsAdd] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [list, setList] = useState([]);

  // dispatch를 사용하기 위한 준비
  // const dispatch = useDispatch();

  // store에 접근하여 state 가져오기
  // const { count } = useSelector((state) => state.counter);

  // const modeHandler = () => {
  //   // store에 있는 state 바꾸는 함수 실행
  //   dispatch(modeReducer());
  // };

  // 목데이터를 불러와 list에 저장하는 함수
  async function data() {
    const response = await Api.get(`awardList/${portfolioOwnerId}`);
    const result = await response.data;
    // setList(result);
  }

  useEffect(() => {
    data();
  }, []);

  const handleDelete = (list, value) => {
    alert(`${value.title} 수상내역을 지우시겠습니까?`);
    setList(
      list.filter((list) => {
        return list.id != value.id;
      })
    );
  };

  // const handleDelete = async (value) => {
  //   alert(`${value.title} 수상내역을 지우시겠습니까?`);
  //   const response = await Api.delete(`awards/${value.id}`);
  //   const result = response.data;
  //   console.log(result);
  // };

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
                <AwardEdit
                  setIsEdit={setSelectedIndex}
                  list={list}
                  setList={setList}
                  value={value}
                  index={index}
                />
              ) : (
                <Row>
                  <Col sm={8}>
                    <h5>{value.title}</h5> {/* 수상제목 */}
                    <p>{value.content}</p> {/* 수상내용 */}
                  </Col>
                  <Col sm={4}>
                    <Button
                      variant="outline-danger"
                      onClick={() => setSelectedIndex(index)}
                    >
                      수정
                    </Button>{" "}
                    <Button
                      variant="outline-warning"
                      onClick={() => handleDelete(list, value)}
                    >
                      삭제
                    </Button>
                  </Col>
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
            portfolioOwnerId={portfolioOwnerId}
          />
        ) : (
          <> </>
        )}
        <Form.Group as={Row} className="mt-3 text-center">
          <Col>
            <Button onClick={() => setIsAdd(true)}>+</Button>
          </Col>
        </Form.Group>
      </Form>
    </Card>
  );
}

export default Award;
