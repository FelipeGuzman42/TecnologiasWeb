const {Sequelize} = require("sequelize");
//crear base de datos
const sequelize = new Sequelize("moviesdb", "", "", 
{
    dialect: "sqlite",
    storage: "./database/database.sqlite"
});
//conectar base de datos
sequelize.authenticate().then(() =>
{
    console.log("Authenticated!");
});

//sequelize.close().then();

module.exports = {sequelize};
