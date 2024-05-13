import env from "../../config/environments";

const { database, host, password, user, dialect } = env.db;

export default {
  development: {
    username: user,
    password,
    database,
    host,
    dialect,
  },
  // TODO: Implement
  // test: {},
  // production: {},
};
