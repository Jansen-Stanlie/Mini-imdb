'use strict';
const {
  Model
} = require('sequelize');
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
    }
  }
  Film.init({
    id_genre: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    director: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};