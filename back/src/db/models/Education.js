import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByEducationId({ education_id }) {
    const education = await EducationModel.findOne({ id: education_id });
    return education;
  }

  static async findAllByUserId({ user_id }) {
    const educations = await EducationModel.find({ user_id: user_id });
    return educations;
  }

  static async update({ education_id, fieldToUpdate, newValue }) {
    const filter = { id: education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async delete({ education_id }) {
    await EducationModel.deleteOne({ id: education_id });
  }
}

export { Education };
