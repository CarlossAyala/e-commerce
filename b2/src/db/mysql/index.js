const fs = require("fs");
const path = require("path");
const sequelize = require("./config");

const db = require("./models");

// const checkDBConnection = async () => {
//   await db.sequelize.authenticate();
//   console.log("Database connected");
// };

const startDB = async () => {
  // console.log("Starting database");
  // await sequelize.authenticate();
  // console.log("Database connected");

  const models = {};
  fs.readdirSync(path.join(__dirname, "models"))
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== "index.js" &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, "models", file))(sequelize);
      models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

module.exports = { checkDBConnection, startDB };
