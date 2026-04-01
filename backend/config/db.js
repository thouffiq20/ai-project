import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ai_mentor", "postgres", "umar20", {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected SUCCESSFULLY");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    throw error;
  }
}

export { sequelize, connectDB };
export default connectDB;