import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import envConfig from "../../config/dotenv.confiq";
import { Books, Reviews, Users } from "../models";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: "api_book",
  user: envConfig.Postgress.Username,
  password: envConfig.Postgress.Password,
  host: envConfig.Postgress.Host,
  port: envConfig.Postgress.Port,
  clientMinMessages: "notice",
  models: [Users, Books, Reviews],
});

export default sequelize;
