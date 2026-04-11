import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcrypt";

const Admin = sequelize.define(
  "Admin",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Stops Sequelize from changing "Admin" to "Admins"
  },
);

Admin.seedDefault = async () => {
  try {
    const count = await Admin.count();
    console.log(`Current Admin count: ${count}`); // Check this in your terminal

    if (count === 0) {
      const hashedPassword = await bcrypt.hash("12341234", 10);
      await Admin.create({
        username: "Vipul@Deosoft",
        password: hashedPassword,
      });
      console.log("💎 SUCCESS: Default Admin 'Vipul@Deosoft' created.");
    } else {
      console.log("ℹ️ Admin already exists, skipping seed.");
    }
  } catch (error) {
    console.error("❌ Seeding Error:", error);
  }
};

export default Admin;
