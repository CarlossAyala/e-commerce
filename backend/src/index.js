import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";

import routes from "./routes.js";
import env from "./config/environments.js";
import { sequelize } from "./database/mysql/index.js";
import {
  restrictMethods,
  handlerError,
  logger,
  catch404AndForward,
} from "./middlewares/index.js";
import("./jobs/index.js");

// TODO: Check what to do with this
import "./database/mysql/models/index.js";

const app = express();
const { port: PORT } = env;

// middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
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
app.use(express.static(path.join(__dirname, "../public")));

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
