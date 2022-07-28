const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Progreso extends Model {}

Progreso.init(
  {
    bmi: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    balanceAlimenticio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    porcionesAlimentos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Progreso",
  }
);



module.exports = Progreso;