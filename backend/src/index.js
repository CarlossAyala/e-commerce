const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const { port: PORT } = require("./config/environments");
const { sequelize } = require("./database/mysql");
const {
  restrictMethods,
  handlerError,
  logger,
  catch404AndForward,
} = require("./middlewares");
require("./database/mysql/models");

const app = express();

// middlewares
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(restrictMethods);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(routes);

app.use(catch404AndForward);
app.use(handlerError);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => console.log(`Server is running on port ${PORT} 🚀`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
