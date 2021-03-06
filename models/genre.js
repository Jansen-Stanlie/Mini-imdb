"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Genre extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Film, {
				foreignKey: "id_film",
				as: "genres",
			});
		}
	}
	Genre.init(
		{
			id_film: DataTypes.INTEGER,
			genre: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Genre",
		}
	);
	return Genre;
};
