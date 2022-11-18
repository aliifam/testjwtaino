import { Sequelize } from "sequelize";

const db = new Sequelize("aino-test-jwt", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
