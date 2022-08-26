import { Schema, model } from "mongoose";

//model은 schema 객체로 만든 instance 객체

const EducationSchema = new Schema(
  {
    user_id: {
      type: String,
      // UserModel의 이름인 User를 사용
      ref: "User",
      required: true,
      index: true,
    },
    id: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
