import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
  // 새로운 학력 추가
  static async addAward({ user_id, title, description }) {
    // id에 unique value부여
    const id = uuidv4();
    console.log(id);

    const newAward = {
      user_id,
      id,
      title,
      description,
    };

    //db에 저장
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;

    return createdNewAward;
  }

  // 학력 수정
  static async setAward({ award_id, toUpdate }) {
    // 해당 award_id를 가진 학력이 db에 있는지 확인
    let award = await Award.findByAwardId({ award_id });

    // db에서 찾지 X, 에러
    if (!award) {
      const errorMessage =
        "해당 수상내역이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상을 확인 학력의 경우: title, description
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

    return award;
  }

  // 해당 유저의 모든 학력 내용 가져오기
  static async getAwardInfo({ user_id }) {
    const awards = await Award.findByUserId({ user_id });

    return awards;
  }

  static async deleteAward({ award_id }) {
    await Award.delete({ award_id });
  }
}

export { awardService };
