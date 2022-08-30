import React, { useState } from "react";
import { Card } from "react-bootstrap";

import * as Api from "../../api";

import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificateList, setCertificateList] = useState([
    {
      id: 0,
      title: "title",
      description: "description",
      date: "2022-08-25",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Card className="p-3 mt-3">
      <Card.Body>
        <Card.Title className="mb-3">
          <h3>🪪 자격증</h3>
        </Card.Title>

        {certificateList.map((certificate, index) => (
          <Certificate
            key={certificate.id}
            certificate={certificate} //이름 이상해
            setCertificateList={setCertificateList}
            certificateList={certificateList}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <CertificateAddForm
            setIsAdding={setIsAdding}
            isAdding={isAdding}
            certificateList={certificateList}
            setCertificateList={setCertificateList}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
