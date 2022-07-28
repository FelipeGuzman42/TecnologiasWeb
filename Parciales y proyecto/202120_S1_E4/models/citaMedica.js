const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");


class CitaMedica extends Model { }

CitaMedica.init(
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idNutritionist: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lugar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    presencial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    link: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    duracion: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "CitaMedica",
  }
);

module.exports = CitaMedica;
