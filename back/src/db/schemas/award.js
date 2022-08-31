import { Schema, model } from "mongoose";
import id from "./types/id";

const AwardSchema = new Schema(
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
    hostOrganization: {
      type: String,
      required: true,
    },
    awardDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
