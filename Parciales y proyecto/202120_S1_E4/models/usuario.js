const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Usuario extends Model {}

Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    estatura: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    peso: {
      type: DataTypes.NUMBER,
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
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Usuario",
  }
);



module.exports = Usuario;