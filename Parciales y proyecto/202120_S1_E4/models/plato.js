const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Plato extends Model {}

Plato.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Plato",
  }
);



module.exports = Plato;