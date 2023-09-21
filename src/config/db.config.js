import dotenv from "dotenv";

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

export const dbMongoAtlas = process.env.MONGODB_ATLAS;


