import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Api from "../../api";

import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificateList, setCertificateList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get(`users/${portfolioOwnerId}/certificates`).then((res) => {
      setCertificateList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Card className="p-3 mt-3">
      <Card.Body>
        <Card.Title className="mb-3">
          <h3>🪪 자격증</h3>
        </Card.Title>

        {certificateList.map((certificate) => (
          <Certificate
            key={certificate.id}
            certificate={certificate}
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
            portfolioOwnerId={portfolioOwnerId}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
