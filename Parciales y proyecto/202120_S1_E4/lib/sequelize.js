const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("S1G4DB", "equipo4", "healthy", {
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

sequelize.authenticate().then(() => {});

module.exports = sequelize;
