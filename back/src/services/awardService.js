import { Award } from "../db";

class awardService {
  // 새로운 학력 추가
  static async addAward({ user_id, title, description, hostOrganization, awardDate }) {
    try {const newAward = {
      user_id,
      title,
      description,
      hostOrganization,
      awardDate,
    };

    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
    } catch (error) {
      const errorMessage ="모든 항목을 입력해주세요.";
      return { errorMessage };
    }
  }

  // 해당 유저의 모든 학력 내용 가져오기
  static async getAwards({ user_id }) {
    const awards = await Award.findAllByUserId({ user_id });

    return awards;
  }

  // 학력 수정
  static async setAward({ award_id, toUpdate }) {
    let award = await Award.findByAwardId({ award_id });

    // db에서 찾지 X, 에러
    if (!award) {
      const errorMessage =
        "해당 수상내역이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상을 확인 : title, description
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }

    if (toUpdate.hostOrganization) {
      const fieldToUpdate = "hostOrganization";
      const newValue = toUpdate.hostOrganization;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }

    if (toUpdate.awardDate) {
      const fieldToUpdate = "awardDate";
      const newValue = toUpdate.awardDate;
      award = await Award.update({ award_id, fieldToUpdate, newValue });
    }

    return award;
  }

  static async deleteAward({ award_id }) {
    await Award.delete({ award_id });
  }
}

export { awardService };
