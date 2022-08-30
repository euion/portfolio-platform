import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import EduUpdate from "./EduUpdate";
import * as Api from "../../api";

/**  학력정보 한단위로 나타냄 */
function EduList({ edu, setEducations, educations, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(educations);
  }, [educations]);
  return (
    <>
      {isEditing ? (
        <EduUpdate
          key={edu.id}
          setIsEditing={setIsEditing}
          educations={educations}
          edu={edu}
        />
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
  portfolioOwnerId,
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
            onClick={async (e) => {
              e.preventDefault();
              await Api.delete(`educations/${edu.id}`).then((res) =>
                console.log(res.data)
              );
              setEducations(educations.filter((e) => e.id !== edu.id));
            }}
          >
            삭제
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default EduList;
