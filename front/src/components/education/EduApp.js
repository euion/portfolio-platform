import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import EduInputForm from "./EduInputForm";
import EduList from "./EduList";
import * as Api from "../../api";
import { modeContext } from "../../App";

const initialState = {
  inputs: {
    school: "",
    major: "",
    position: "재학중",
  },
  users: [],
};

function EduApp({ portfolioOwnerId, isEditable }) {
  const mode = useContext(modeContext);
  const [educations, setEducations] = useState(initialState.users);
  const [isAdding, setIsAdding] = useState(true);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    Api.get(`users/${portfolioOwnerId}/educations`).then((res) =>
      setEducations(res.data)
    );
    setIsLoading(false);
  }, [portfolioOwnerId]);

  return (
    <>
      {isLoading && <div
        style={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1> 로딩중... 😎 </h1>
      </div>}
      {!isLoading && <Card
        className="ml-5"
        bg={mode.toLowerCase()}
        text={mode.toLowerCase() === "light" ? "dark" : "white"}
      >
        <Card.Body>
          <h3>📚 학력</h3>
          {educations &&
            educations.map((edu, index) => (
              <div key={index}>
                <EduList
                  key={edu.id}
                  edu={edu}
                  setEducations={setEducations}
                  educations={educations}
                  isEditable={isEditable}
                  portfolioOwnerId={portfolioOwnerId}
                />
              </div>
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
      </Card>}

    </>
  );
}
export default EduApp;
