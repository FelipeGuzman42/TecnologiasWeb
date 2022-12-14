const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequilize")

class Movie extends Model {}

Movie.init
(
    {
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Movie",
    }
);

Movie.sync();

module.exports = Movie;