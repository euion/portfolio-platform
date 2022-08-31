import { Schema, model } from "mongoose";
import id from "./types/id";

const CertificateSchema = new Schema(
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
    when_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
