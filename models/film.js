"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Film extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Genre, {
				foreignKey: "id_film",
				as: "genre",
			});

			this.hasMany(models.Category, {
				foreignKey: "id_film",
				as: "category",
			});

			this.hasMany(models.Rating, {
				foreignKey: "id_film",
				as: "ratings",
			});
			this.hasMany(models.Video, {
				foreignKey: "id_film",
				as: "video",
			});
			this.hasMany(models.Photo, {
				foreignKey: "id_film",
				as: "photo",
			});
			this.hasMany(models.Actor, {
				foreignKey: "id_film",
				as: "actors",
			});
			this.hasMany(models.Comment, {
				foreignKey: "id_film",
				as: "comment",
			});
		}
	}
	Film.init(
		{
			title: DataTypes.STRING,
			year: DataTypes.INTEGER,
			director: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Film",
		}
	);
	return Film;
};
