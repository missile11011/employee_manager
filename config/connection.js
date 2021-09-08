const Sequelzie = require("sequelize");
require("dotenv").config();

const sequelzie = new Sequelzie(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);
module.exports = sequelzie;