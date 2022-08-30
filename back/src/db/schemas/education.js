import { Schema, model } from "mongoose";
import id from "./types/id";

const EducationSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    id,
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
