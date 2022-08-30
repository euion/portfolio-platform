import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as Api from "../../api";

function EduUpdate({ setIsEditing, edu, key }) {
  const [school, setSchool] = useState(edu.school);
  const [major, setMajor] = useState(edu.major);
  const [position, setPosition] = useState(edu.position);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.put(`educations/${edu.id}`, {
      school,
      major,
      position,
    });
    edu.school = school;
    edu.major = major;
    edu.position = position;
    setIsEditing(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <p></p>
          <Form.Control
            name="school"
            placeholder="학교 이름"
            defaultValue={edu.school}
            onChange={(e) => {
              setSchool(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="major"
            placeholder="전공"
            defaultValue={edu.major}
            onChange={(e) => {
              setMajor(e.target.value);
            }}
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
              defaultChecked={position === "재학중"} // 안될시 edu.position
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              style={{ margin: " 0 10px" }}
            />
            <Form.Check
              type="radio"
              name="position"
              value="학사졸업"
              defaultChecked={position === "학사졸업"}
              label="학사졸업"
              onChange={(e) => {
                setPosition(e.target.value);
              }}
            />
            <Form.Check
              type="radio"
              label="석사졸업"
              name="position"
              value="석사졸업"
              defaultChecked={position === "석사졸업"}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              style={{ margin: " 0 10px" }}
            />
            <Form.Check
              type="radio"
              name="position"
              value="박사졸업"
              defaultChecked={position === "박사졸업"}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
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
              // style={{ margin: " 5px 5px" }}
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
            onClick={() => {
              setIsEditing(false);
            }}
          >
            취소
          </Button>
        </div>
      </Form>
    </>
  );
}

export default EduUpdate;
