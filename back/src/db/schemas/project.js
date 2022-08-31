import { Schema, model } from "mongoose";
import id from "./types/id";

const ProjectSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    id,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    imagePath: {
      type: Array,
      required: false,
    },
    from_date: {
      type: Date,
      required: true,
    },
    to_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
