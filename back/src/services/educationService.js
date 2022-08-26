import { Education, User } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  // 새로운 학력 추가
  static async addEducation({ user_id, school, major, position }) {
    // id에 unique value부여
    const id = uuidv4();

    const newEducation = {
      user_id,
      id,
      school,
      major,
      position,
    };

    //db에 저장
    const createdNewEducation = await Education.create({
      newEducation,
    });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  // 학력 수정
  static async setEducation({ edu_id, toUpdate }) {
    // 해당 edu_id를 가진 학력이 db에 있는지 확인
    let education = await Education.findByEduId({ edu_id });

    // db에서 찾지 X, 에러
    if (!education) {
      const errorMessage =
        "해당 학력이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상을 확인 학력의 경우: school, major,  position
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ edu_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ edu_id, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({ edu_id, fieldToUpdate, newValue });
    }
    // console.log(education);
    return education;
  }

  // 해당 유저의 모든 학력 내용 가져오기
  static async getEducationInfo({ user_id }) {
    const educations = await Education.findByUserId({ user_id });

    return educations;
  }

  static async deleteEducation({ edu_id }) {
    await Education.delete({ edu_id });
  
  }
}

export { educationService };
