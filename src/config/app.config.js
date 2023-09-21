import dotenv from "dotenv";

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

export const port = process.env.PORT || 8080;
export const persistence = process.env.PERSISTENCE || "memory";
export const nodemailerEMAIL = process.env.NODEMAILER_EMAIL
export const nodemailerEMAIL_PASSWORD = process.env.NODEMAILER_EMAIL_PASSWORD