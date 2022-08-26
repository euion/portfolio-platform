import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import EduList from "./EduList";

function EduInputForm({
  setIsEditing,
  onCreate,
  onChange,
  school,
  major,
  position,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("school", school);
    console.log("major : ", major);
    console.log("position : ", position);
    onCreate(school, major, position);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            name="school"
            placeholder="학교 이름"
            onChange={onChange}
            defaultValue={school}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="major"
            placeholder="전공"
            onChange={onChange}
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
              onChange={onChange}
              defaultChecked={position === "재학중"}
              style={{ margin: " 0 10px" }}
            />
            <Form.Check
              type="radio"
              name="position"
              value="학사졸업"
              onChange={onChange}
              defaultChecked={position === "학사졸업"}
              label="학사졸업"
            />
            <Form.Check
              type="radio"
              label="석사졸업"
              name="position"
              value="석사졸업"
              onChange={onChange}
              chdefaultCheckedecked={position === "석사졸업"}
              style={{ margin: " 0 10px" }}
            />
            <Form.Check
              type="radio"
              name="position"
              value="박사졸업"
              onChange={onChange}
              defaultChecked={position === "박사졸업"}
              label="박사졸업"
            />
          </div>
        </Form.Group>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            type="submit"
            style={{ margin: " 5px 5px" }}
          >
            확인
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            onSubmit={handleSubmit}
          >
            취소
          </Button>
        </div>
      </Form>
    </>
  );
}

export default EduInputForm;
