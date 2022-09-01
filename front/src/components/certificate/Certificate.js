import React, { useState } from "react";

import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";

function Certificate({ isEditable, certificate, setCertificateList }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          key={certificate.id}
          setIsEditing={setIsEditing}
          certificate={certificate}
          setCertificateList={setCertificateList}
        />
      ) : (
        <CertificateCard
          key={certificate.id}
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCertificateList={setCertificateList}
        />
      )}
    </>
  );
}

export default Certificate;
