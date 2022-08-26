import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import EduUpdate from "./EduUpdate";

/**  학력정보 한단위로 나타냄 */
function EduList({ edu, setEducations, educations, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EduUpdate key={edu.id} setIsEditing={setIsEditing} edu={edu} />
      ) : (
        <EduCard
          key={edu.id}
          edu={edu}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setEducations={setEducations}
          educations={educations}
          isEditing={isEditing}
        />
      )}
    </>
  );
}

/** 유저 학력정보 리스트 출력*/
function EduCard({
  setIsEditing,
  isEditable,
  edu,
  setEducations,
  educations,
  isEditing,
}) {
  return (
    <>
      <Row>
        <Col sm={8}>
          <h5>{edu.school}</h5>
          <p>
            {edu.major}, {edu.position}
          </p>
        </Col>
        <Col md="auto"></Col>
        <Col>
          {isEditable && (
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="ms-2 mb-3"
              variant="outline-warning"
            >
              {isEditing ? "취소" : "수정"}
            </Button>
          )}
          <Button
            className="ms-2 mb-3"
            variant="outline-danger"
            onClick={() =>
              setEducations(educations.filter((e) => e.id !== edu.id))
            }
          >
            삭제
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default EduList;
