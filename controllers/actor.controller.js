const { sequelize, Actor, Film, Video } = require("../models/index");

const addActor = async (req, res) => {
	const { id_film, name } = req.body;
	console.log(id_film);
	console.log(name.length);
	Film.findOne({
		where: {
			id: id_film,
		},
	})
		.then((data) => {
			if (!data) {
				return res.status(404).json({
					status: "Failed to add comment",
					message: "Film not exist",
				});
			}
			Actor.findOne({
				where: {
					id_film: id_film,
				},
			}).then((data) => {
				if (data) {
					return res.status(404).json({
						status: "Failed to add comment",
						message: "Actor has been register to the film",
					});
				}
				if (name.length > 1) {
					name.map((names) => {
						Actor.create({
							id_film: id_film,
							name: name,
						})
							.then((data) => {
								return res.status(200).json({
									status: "Success",
									data: data,
								});
							})
							.catch((err) => {
								return res.status(400).json({
									status: "fail",
									message: err,
								});
							});
					});
				}
				Actor.create({
					id_film: id_film,
					name: name.toString(),
				})
					.then((data) => {
						return res.status(200).json({
							status: "Success",
							data: data,
						});
					})
					.catch((err) => {
						return res.status(400).json({
							status: "fail",
							message: err,
						});
					});
			});
		})
		.catch((err) => {
			return res.status(400).json({
				status: "fail",
				message: err,
			});
		});
};

const allActor = async (req, res) => {
	await Actor.findAll({
		attributes: [
			"id",
			"name",
			[sequelize.literal(`"actors"."title"`), "TitleFilm"],
		],
		subQuery: false,
		include: [
			{
				model: Film,
				as: "actors",
				attributes: [],
			},
		],
	})
		.then((data) => {
			return res.status(200).json({
				status: "Success",
				data: data,
			});
		})
		.catch((err) => {
			return res.status(400).json({
				status: "fail",
				message: err,
			});
		});
};

const getActorByName = async (req, res) => {
	const { name } = req.body;

	await Actor.findAll({
		where: {
			name: name,
		},
		attributes: [
			"id",
			"name",
			[sequelize.literal(`"actors"."title"`), "TitleFilm"],
		],
		subQuery: false,
		include: [
			{
				model: Film,
				as: "actors",
				attributes: [],
			},
		],
	})
		.then((data) => {
			res.status(200).json({
				status: "Success",
				data: data,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "fail",
			});
		});
};

const updateActor = async (req, res) => {
	const { id } = req.params;
	await Actor.update(req.body, {
		where: {
			id: id,
		},
	})
		.then((data) => {
			res.status(200).json({
				status: "Success",
				data: data,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "fail",
			});
		});
};

const deleteActor = async (req, res) => {
	const { id } = req.params;

	await Actor.destroy({
		where: {
			id: id,
		},
	})
		.then((data) => {
			res.status(200).json({
				status: "Success",
				data: data,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "fail",
			});
		});
};

module.exports = {
	addActor,
	updateActor,
	deleteActor,
	allActor,
	getActorByName,
};
