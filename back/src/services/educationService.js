import { Education, User } from "../db";

class educationService {
  // 새로운 학력 추가
  static async addEducation({ user_id, school, major, position }) {
    try {const newEducation = {
      user_id,
      school,
      major,
      position,
    };

    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
    } catch (error) {
      const errorMessage ="모든 항목을 입력해주세요.";
      return { errorMessage };
    }
  }

  // 해당 유저의 모든 학력 내용 가져오기
  static async getEducations({ user_id }) {
    const educations = await Education.findAllByUserId({ user_id });

    return educations;
  }

  // 학력 수정
  static async setEducation({ education_id, toUpdate }) {
    // 해당 edu_id를 가진 학력이 db에 있는지 확인
    let education = await Education.findByEducationId({ education_id });

    // db에서 찾지 X, 에러
    if (!education) {
      const errorMessage =
        "해당 학력이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상을 확인 : school, major, position
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    return education;
  }



  static async deleteEducation({ education_id }) {
    await Education.delete({ education_id });
  }
}

export { educationService };
