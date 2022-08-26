import React, { useCallback, useReducer, useState } from "react";
import { Button, Card } from "react-bootstrap";
import User from "../user/User";
import EduInputForm from "./EduInputForm";
import { Container, Col, Row } from "react-bootstrap";
import EduList from "./EduList";
import EduUpdate from "./EduUpdate";

let nextId = 4;

const initialState = {
  inputs: {
    school: "",
    major: "",
    position: "재학중",
  },
  users: [
    {
      id: 1,
      school: "엘리스 대학교",
      major: "컴퓨터공학과",
      position: "재학중",
    },
    {
      id: 2,
      school: "엘리스 대학교",
      major: "기계공학과",
      position: "박사졸업",
    },
    {
      id: 3,
      school: "체셔 대학교",
      major: "생명공학과",
      position: "석사졸업",
    },
  ],
};

function reducer(userState, action) {
  switch (action.type) {
    /* 내용 변경(컨텐츠 변경) */
    case "CHANGE_INPUT":
      return {
        ...userState,
        inputs: {
          ...userState.inputs,
          [action.name]: action.value,
        },
      };
    /* 내용 입력(add) */
    case "ADD_EDUCATION":
      return {
        inputs: initialState.inputs,
        users: userState.users.concat(action.user),
      };
    /* 내용 삭제(delete) */
    case "DELETE_EDUCATION":
      return {
        ...userState,
        users: userState.users.filter((user) => user.id !== action.id),
      };
    case "UPDATE_EDUCATION":
      // const updateState = { ...userState };
      // updateState[action.id] = action
      return {
        ...userState,
        users: userState.users.map((user) =>
          user.id === action.id
            ? {
                ...userState,
                inputs: {
                  ...userState.inputs,
                  [action.name]: action.value,
                },
              }
            : user
        ),
      };
    default:
      return userState;
  }
}

function EduApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState(false);

  /* reducer 상태관리 관련 처리 */
  const { users } = state;
  const { school, major, position } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
    // console.log(name, " : ", value);
  }, []);

  const onCreate = useCallback(() => {
    console.log("완료");
    dispatch({
      type: "ADD_EDUCATION",
      user: {
        id: nextId++,
        school,
        major,
        position,
      },
    });
    console.log(users[nextId]);
  }, [school, major, position]);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "DELETE_EDUCATION",
      id,
    });
  }, []);
  const onUpdate = useCallback((id) => {
    dispatch({
      type: "UPDATE_EDUCATION",
      id,
    });
    return;
  }, []);
  if (isEditing) {
    return (
      <>
        <Container center>
          <Row>
            <Col lg="8">
              <Card>
                <Card.Body>
                  <h3>학력</h3>
                  <EduList
                    users={users}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                  />
                  <div style={{ textAlign: "center", margin: "5px" }}>
                    {isEditing && (
                      <EduInputForm
                        setIsEditing={setIsEditing}
                        onCreate={onCreate}
                        onChange={onChange}
                        school={school}
                        major={major}
                        position={position}
                      />
                    )}
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="primary"
                    >
                      -
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  if (!isEditing) {
    return (
      <>
        <Container center>
          <Row>
            <Col lg="8">
              <Card>
                <Card.Body>
                  <h3>학력</h3>
                  <EduList
                    users={users}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                  />
                  <div style={{ textAlign: "center", margin: "5px" }}>
                    {/* {!isEditing && (
                      <p>
                        {major}&#40;{state}&#41;
                      </p>
                    )} */}
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="primary"
                    >
                      +
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default EduApp;
