import React, { useState } from "react";

import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";

function Certificate({
  isEditable,
  certificate,
  setCertificateList,
  certificateList,
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          key={certificate.id}
          setIsEditing={setIsEditing}
          certificate={certificate}
        />
      ) : (
        <CertificateCard
          key={certificate.id}
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCertificateList={setCertificateList}
          certificateList={certificateList}
        />
      )}
    </>
  );
}

export default Certificate;
