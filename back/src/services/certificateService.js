import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { User } from "../db"
import { v4 as uuidv4 } from "uuid";

class certificateService {
  static async addCertificate({ user_id, title, description, when_date }) {
    const id = uuidv4()

    const newCertificate = { user_id, id, title, description, when_date };

    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }
  
  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findAll({ user_id });
    return certificates;
  }

  static async deleteCertificate({ certificate_id }) {
    await Certificate.delete({ certificate_id })
  }

  static async setCertificate({ certificate_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ certificate_id });

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ certificate_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ certificate_id, fieldToUpdate, newValue });
    }

    if (toUpdate.when_date) {
        const fieldToUpdate = "when_date";
        const newValue = toUpdate.from_date;
        certificate = await Certificate.update({ certificate_id, fieldToUpdate, newValue });
    }

    return certificate;
  }
}

export { certificateService };
