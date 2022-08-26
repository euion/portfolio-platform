import React, { useState } from "react";
import { Card } from "react-bootstrap";
import EduInputForm from "./EduInputForm";
import EduList from "./EduList";

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

function EduApp({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState(initialState.users);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <Card className="ml-5 p-3">
        <Card.Body>
          <h3>📚학력</h3>
          {educations.map((edu) => (
            <EduList
              key={edu.id}
              edu={edu}
              setEducations={setEducations}
              educations={educations}
              isEditable={isEditable}
            />
          ))}
          <div style={{ textAlign: "center", margin: "5px" }}>
            {isEditable && (
              <EduInputForm
                setIsAdding={setIsAdding}
                isAdding={isAdding}
                educations={educations}
                setEducations={setEducations}
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default EduApp;
