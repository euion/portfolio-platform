import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import * as Api from "../../api";

function EduInputForm({ setIsAdding, isAdding, educations, setEducations }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("재학중");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.post("education", {
      school,
      major,
      position,
    });
    const newEducation = {
      school: school,
      major: major,
      position: position,
    };
    setEducations([...educations, newEducation]);
    setSchool("");
    setMajor("");
    setPosition("재학중");
    setIsAdding(false);
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
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            {school && major && position ? (
              <Button
                className="ms-2 mb-3"
                variant="primary"
                type="submit"
                //style={{ margin: " 5px 5px" }}
              >
                확인
              </Button>
            ) : (
              <Button className="ms-2 mb-3" variant="primary" disabled>
                확인
              </Button>
            )}
            <Button
              className="ms-2 mb-3"
              variant="outline-primary"
              type="button"
              onClick={() => {
                setIsAdding(false);
              }}
            >
              취소
            </Button>
          </div>
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
