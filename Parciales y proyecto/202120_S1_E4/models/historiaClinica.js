const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class HistoriaClinica extends Model {}

HistoriaClinica.init(
  {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    medicamentos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enfermedades: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cirugias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alergias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "HistoriaClinica",
  }
);



module.exports = HistoriaClinica;