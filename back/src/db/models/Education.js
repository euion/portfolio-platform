import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByEduId({ edu_id }) {
    // edu_id로 검색
    const education = await EducationModel.findOne({ id: edu_id });
    return education;
  }

  // findAll vs find - findAll이 속도는 느릴 수 있지만 확실하게 모든 것을 찾아서 반환
  static async findByUserId({ user_id }) {
    // 전체 학력 list를 불러옴 (pl.)
    console.log(user_id);
    const educations = await EducationModel.find({ user_id: user_id });
    return educations;
  }

  static async update({ edu_id, fieldToUpdate, newValue }) {
    // 변경하고자 하는 특정 학력의 id로 filtering
    const filter = { id: edu_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async delete({ edu_id }) {
    await EducationModel.deleteOne({ id: edu_id });
  }
}

export { Education };
