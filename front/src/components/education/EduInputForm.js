import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import EduList from "./EduList";

function EduInputForm({ setIsAdding, isAdding, educations, setEducations }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("재학중");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("school", school);
    console.log("major : ", major);
    console.log("position : ", position);
    const newEducation = {
      id: educations.length,
      school: school,
      major: major,
      position: position,
    };
    setEducations([...educations, newEducation]);
    setSchool("");
    setMajor("");
    setPosition("");
    setIsAdding(false);
    return;
  };

  return (
    <>
      {isAdding ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="school"
              placeholder="학교 이름"
              onChange={(e) => {
                setSchool(e.target.value);
              }}
              defaultValue={school}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="major"
              placeholder="전공"
              onChange={(e) => {
                setMajor(e.target.value);
              }}
              defaultValue={major}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <div style={{ display: "flex" }}>
              <Form.Check
                type="radio"
                label="재학중"
                id="radio1"
                name="position"
                value="재학중"
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
                defaultChecked={position === "재학중"}
                style={{ margin: " 0 10px" }}
              />
              <Form.Check
                type="radio"
                name="position"
                value="학사졸업"
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
                defaultChecked={position === "학사졸업"}
                label="학사졸업"
              />
              <Form.Check
                type="radio"
                label="석사졸업"
                name="position"
                value="석사졸업"
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
                chdefaultCheckedecked={position === "석사졸업"}
                style={{ margin: " 0 10px" }}
              />
              <Form.Check
                type="radio"
                name="position"
                value="박사졸업"
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
                defaultChecked={position === "박사졸업"}
                label="박사졸업"
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: " 5px 5px" }}
              onClick={() => {
                setIsAdding(true);
              }}
            >
              확인
            </Button>
            <Button
              className="ms-1"
              variant="secondary"
              type="button"
              onClick={() => {
                setIsAdding(false);
              }}
            >
              취소
            </Button>
          </Form.Group>
        </Form>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            type="submit"
            style={{ margin: " 5px 5px" }}
            onClick={() => setIsAdding(true)}
          >
            +
          </Button>
        </div>
      )}
    </>
  );
}

export default EduInputForm;
