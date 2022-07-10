const Comment = require("../models/index").Comment;
const { sequelize } = require("../models/index");

const userFeedback = async (req, res, next) => {
	try {
		const feedBack = await sequelize.transaction(async (t) => {
			console.log("makan");
			return res.status(200).json({
				status: "yes",
				message: error,
			});
		});
	} catch (error) {
		return res.status(400).json({
			status: "Gagal",
			message: error,
		});
	}
};
module.exports = { userFeedback };
