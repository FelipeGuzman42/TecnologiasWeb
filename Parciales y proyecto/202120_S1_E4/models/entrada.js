const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Entrada extends Model {}

Entrada.init(
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dieta: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Entrada",
  }
);



module.exports = Entrada;