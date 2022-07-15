"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Comment, {
				foreignKey: "id_film",
				as: "comments",
			});
		}
	}
	Comment.init(
		{
			id_film: DataTypes.INTEGER,
			comment: DataTypes.STRING,
			id_user: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);
	return Comment;
};
