import { Certificate } from "../db";

class certificateService {
  // 새로운 자격증 추가
  static async addCertificate({ user_id, title, description, when_date }) {
    try {const newCertificate = {
      user_id,
      title,
      description,
      when_date,
    };

    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
    } catch (error) {
      const errorMessage ="모든 항목을 입력해주세요.";
      return { errorMessage };
    }
  }
  
  // 해당 유저의 모든 자격증 내용 가져오기
  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findAllByUserId({ user_id });
    
    return certificates;
  }

  // 자격증 수정
  static async setCertificate({ certificate_id, toUpdate }) {
    let certificate = await Certificate.findByCertificateId({ certificate_id });

    // db에서 찾지 X, 에러
    if (!certificate) {
      const errorMessage =
        "해당 자격증이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상을 확인 : title, description, when_date
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
        const newValue = toUpdate.when_date;
        certificate = await Certificate.update({ certificate_id, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async deleteCertificate({ certificate_id }) {
    await Certificate.delete({ certificate_id })
  }
}

export { certificateService };
