import { Schema, model } from "mongoose";
import id from "./types/id";

const UserSchema = new Schema(
  {
    id,
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    imagePath: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", UserSchema);

export { UserModel };
