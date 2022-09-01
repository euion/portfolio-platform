import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import { modeContext } from "../../App";

import * as Api from "../../api";

import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  const mode = useContext(modeContext);
  const [certificateList, setCertificateList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get(`users/${portfolioOwnerId}/certificates`).then((res) => {
      setCertificateList(res.data);
    });
  }, []);

  return (
    <Card
      className="mt-3 mb-5"
      bg={mode.toLowerCase()}
      text={mode.toLowerCase() === "light" ? "dark" : "white"}
    >
      <Card.Body>
        <Card.Title className="mb-3">
          <h3>📋 자격증</h3>
        </Card.Title>

        {certificateList.map((certificate) => (
          <Certificate
            key={certificate.id}
            certificate={certificate}
            setCertificateList={setCertificateList}
            isEditable={isEditable}
          />
        ))}

        {isEditable && (
          <CertificateAddForm
            setIsAdding={setIsAdding}
            isAdding={isAdding}
            setCertificateList={setCertificateList}
            portfolioOwnerId={portfolioOwnerId}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
