"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Photo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Film, {
				foreignKey: "id_film",
				as: "photo",
			});
		}
	}
	Photo.init(
		{
			id_film: DataTypes.INTEGER,
			photoUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Photo",
		}
	);
	return Photo;
};
