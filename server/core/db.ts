import { Sequelize } from "sequelize/types";

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost:4000',
    dialect: 'postgres',
});


export { sequelize }