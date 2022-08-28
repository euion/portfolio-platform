import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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
        <Row>
          <h5>{edu.school}</h5>
          <p>
            {edu.major}, {edu.position}
          </p>
        </Row>
        <Col>
          <Button
            className="ms-2 mb-3"
            variant="outline-danger"
            onClick={() =>
              setEducations(educations.filter((e) => e.id !== edu.id))
            }
          >
            삭제
          </Button>
          {isEditable && (
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="ms-2 mb-3"
              variant="outline-warning"
            >
              {isEditing ? "취소" : "수정"}
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

export default EduList;
