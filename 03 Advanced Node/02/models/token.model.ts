import mongoose, { models, Schema, Document, ObjectId } from "mongoose";

import { tokenTypes } from "../config/tokens";

export interface TokenI extends Document {
  token: string;
  user: string | ObjectId;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Token = models?.Token || mongoose.model<TokenI>("Token", tokenSchema);

export default Token;
