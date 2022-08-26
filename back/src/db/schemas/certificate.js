import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    user_id: {
        type: String,
        required: true,
        ref: "User"
      },
    id: {
      type: String,
      required: true,
    },
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

const CertificateModel = model("certificate", CertificateSchema);

export { CertificateModel };
