import { Sequelize } from "sequelize";
import env from "../../config/environments.js";

const { database, user, password, host, dialect, port } = env.db;

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  port,
});
