import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.USERNAMEMONGO;
const password = process.env.PASSWORDMONGO;

mongoose.connect(
  `mongodb+srv://${username}:${password}@curso-node-alura.4t62rbw.mongodb.net/node-api`
);

const db = mongoose.connection;

export default db;
