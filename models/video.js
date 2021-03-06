"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Video extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Film, {
				foreignKey: "id_film",
				as: "videos",
			});
		}
	}
	Video.init(
		{
			id_film: DataTypes.INTEGER,
			videoUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Video",
		}
	);
	return Video;
};
