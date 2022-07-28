const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Dieta extends Model {}

Dieta.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Dieta",
  }
);



module.exports = Dieta;