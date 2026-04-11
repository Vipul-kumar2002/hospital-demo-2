import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "deosoft_db",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "8340275873", // Use your actual pass or env
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
);

// ✅ Change "module.exports" to "export default"
export default sequelize;
