import { Schema, model } from "mongoose";
const id = require("./types/id");

const AwardSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "User",
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
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
