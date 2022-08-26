import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

function EduUpdate({ user, onUpdate }) {
  // const [school, setSc] = useState(users.school);
  // const [body, setBody] = useState(users.major);

  const handleSubmit = (e) => {
    e.preventDefault();
    const school = e.target.school.value;
    const major = e.target.major.value;
    const position = e.target.position.value;
    console.log("school", e.target.school.value);
    console.log("major : ", e.target.major.value);
    console.log("position : ", e.target.position.value);

    onUpdate(school, major, position);
  };
  useEffect(
    function exam() {
      console.log(user);
    },
    [user]
  );
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            name="school"
            placeholder="학교 이름"
            defaultValue={user.school}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="major"
            placeholder="전공"
            defaultValue={user.major}
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
              defaultChecked={user.position === "재학중"}
              style={{ margin: " 0 10px" }}
            />
            <Form.Check
              type="radio"
              name="position"
              value="학사졸업"
              defaultChecked={user.position === "학사졸업"}
              label="학사졸업"
            />
            <Form.Check
              type="radio"
              label="석사졸업"
              name="position"
              value="석사졸업"
              defaultChecked={user.position === "석사졸업"}
              style={{ margin: " 0 10px" }}
            />
            <Form.Check
              type="radio"
              name="position"
              value="박사졸업"
              defaultChecked={user.position === "박사졸업"}
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
        </div>
      </Form>
    </>
  );
}

export default EduUpdate;
