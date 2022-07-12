"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([
			  queryInterface.removeColumn('Films', 'id_genre', { transaction: t }),
			  queryInterface.removeColumn('Films', 'id_category', { transaction: t })
			]);
		  });
	},
};
