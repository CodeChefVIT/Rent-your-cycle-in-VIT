import mongoose from "mongoose";

import * as logger from "./logger";
let url = process.env.MONGO_URI;
if (process.env.NODE_ENV === "test") { url = process.env.MONGO_TEST_URL; }

(async () => {
    try {
        await mongoose.connect(url);
      } catch (err) {
        logger.info("database", err.message);
      }
    }
)();


const db = mongoose.connection;

db.on("error", () => {
  logger.error("database", "connection error:");
});
db.once("open", () => {
  logger.info("database", "connected to database");
});
db.on("disconnected", () => {
  logger.warn("database", "disconnected");
});
db.on("reconnected", () => {
  logger.info("database", "reconnected");
});
