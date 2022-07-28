const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Alimento extends Model {}

Alimento.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gramos: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    calorias: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    vitaminas: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    proteinas: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    carbohidratos: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    grasa: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    sodio: {
      type: DataTypes.NUMBER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Alimento",
  }
);


module.exports = Alimento;