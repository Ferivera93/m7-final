// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: console.log
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, DataTypes);
db.Bootcamp = require("./bootcamp.model.js")(sequelize, DataTypes);

db.User.belongsToMany(db.Bootcamp, { through: "user_bootcamp" });
db.Bootcamp.belongsToMany(db.User, { through: "user_bootcamp" });

module.exports = db;
