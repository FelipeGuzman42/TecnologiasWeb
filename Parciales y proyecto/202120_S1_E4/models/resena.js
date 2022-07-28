const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");


class Resena extends Model { }

Resena.init(
  {
    detalles: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calificacion: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Resena",
  }
);




module.exports = Resena;



