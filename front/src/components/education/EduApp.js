import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import EduInputForm from "./EduInputForm";
import EduList from "./EduList";
import * as Api from "../../api";

const initialState = {
  inputs: {
    school: "",
    major: "",
    position: "재학중",
  },
  users: [],
};

function EduApp({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState(null);
  const [isAdding, setIsAdding] = useState(initialState.users);
  useEffect(() => {
    Api.get(`users/${portfolioOwnerId}/educations`).then((res) =>
      setEducations(res.data)
    );
  }, []);

  return (
    <>
      <Card className="ml-5 p-3">
        <Card.Body>
          <h3>📚학력</h3>
          {educations &&
            educations.map((edu) => (
              <EduList
                key={edu.id}
                edu={edu}
                setEducations={setEducations}
                educations={educations}
                isEditable={isEditable}
                portfolioOwnerId={portfolioOwnerId}
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
