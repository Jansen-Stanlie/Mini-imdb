const Comment = require("../models/index").Comment;
const Film = require("../models/index").Film;
const Rating = require("../models/index").Rating;
const { sequelize } = require("../models/index");
const jwt = require("jsonwebtoken");
const userFeedback = async (req, res, next) => {
	const token = req.headers["auth"];
	const privateKey = "my-secret";
	if (!token) {
		return res.status(500).send({
			message: "Internal server Error",
			error: "Token is null",
		});
	}

	const id_user = jwt.verify(token, privateKey, (err, decoded) => {
		return decoded.id;
		console.log("Id User", decoded.id);
	});
	const { rating, comment, id_film } = req.body;
	Film.findOne({
		where: {
			id: id_film,
		},
	}).then(async (data) => {
		if (!data) {
			return res.status(404).json({
				status: "Failed to add comment",
				message: "Film not exist",
			});
		}
		try {
			const feedBack = await sequelize.transaction(async (t) => {
				const addFeedback = await Comment.create(
					{
						id_film: id_film,
						id_user: id_user,
						comment: comment,
					},
					{ transaction: t }
				);
				const addRatings = await Rating.create(
					{
						id_film: id_film,
						id_user: id_user,
						rating: rating,
					},
					{ transaction: t }
				);
				return res.status(200).json({
					status: "yes",
					message: "Comment Has been Saved",
				});
			});
		} catch (error) {
			return res.status(400).json({
				status: "Failed",
				message: error,
			});
		}
	});
};
module.exports = { userFeedback };
