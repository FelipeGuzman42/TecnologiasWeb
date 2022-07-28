const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Nutritionist extends Model {}

Nutritionist.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experiencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    especializacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Nutritionist",
  }
);

module.exports = Nutritionist;