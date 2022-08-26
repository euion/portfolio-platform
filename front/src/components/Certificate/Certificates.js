import React, { useState } from "react";
import { Card } from "react-bootstrap";

import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificateList, setCertificateList] = useState([
    {
      id: 0, //자격증 하나당 아이디
      title: "title",
      description: "description",
      date: "2022-08-25",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3 ms-3 mt-3">자격증</Card.Title>

        {certificateList.map((certificate) => (
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
