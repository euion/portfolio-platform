import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByAwardId({ award_id }) {
    // award_id로 검색
    const award = await AwardModel.findOne({ id: award_id });
    return award;
  }

  static async findByUserId({ user_id }) {
    // 전체 수상 list를 불러옴 (pl.)
    const awards = await AwardModel.find({ user_id: user_id });
    return awards;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    // 변경하고자 하는 특정 award_id로 filtering
    const filter = { id: award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  static async delete({ award_id }) {
    const award = await AwardModel.deleteOne({ id: award_id });
    return award;
  }
}

export { Award };
