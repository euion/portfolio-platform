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
  const [isPlus, setIsPlus] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Api.get(`users/${portfolioOwnerId}/certificates`).then((res) => {
      setCertificateList(res.data);
    });
    setIsLoading(false);
  }, [portfolioOwnerId]);

  return (
    <>
      {isLoading && <div
        style={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1> 로딩중... 😎 </h1>
      </div>}
      {!isLoading &&
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
                setIsPlus={setIsPlus}
                isPlus={isPlus}
              />
            ))}

            {isEditable && (
              <CertificateAddForm
                setIsAdding={setIsAdding}
                isAdding={isAdding}
                setCertificateList={setCertificateList}
                portfolioOwnerId={portfolioOwnerId}
                setIsPlus={setIsPlus}
                isPlus={isPlus}
              />
            )}
          </Card.Body>
        </Card>
      }
    </>
  );
}

export default Certificates;
