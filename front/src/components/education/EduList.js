import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import EduUpdate from "./EduUpdate";

/**  학력정보 한단위로 나타냄 */
function EduList({ edu, setEducations, educations, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {console.log(edu.school)}
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
      <div>
        <h5>{edu.school}</h5>
        <p>
          {edu.major}, {edu.position}
        </p>
        <Button
          onClick={() =>
            setEducations(educations.filter((e) => e.id !== edu.id))
          }
        >
          삭제
        </Button>
        {isEditable && (
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "취소" : "수정"}
          </Button>
        )}
      </div>
    </>
  );
}

export default EduList;
