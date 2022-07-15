const { sequelize, Photo, Film } = require("../models/index");

const addPhoto = async (req, res) => {
	const { id_film, photoUrl } = req.body;

	await Photo.create({
		id_film: id_film,
		photoUrl: photoUrl,
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
			});
		});
};

const allPhoto = async (req, res) => {
	await Photo.findAll({
		attributes: [
			"id",
			"photoUrl",
			[sequelize.literal(`"photos"."title"`), "TitleFilm"],
		],
		subQuery: false,
		include: [
			{
				model: Film,
				as: "photos",
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
			});
		});
};

const getPhotoByPhoto = async (req, res) => {
	const { photoUrl } = req.body;

	await Photo.findAll({
		where: {
			photoUrl: photoUrl,
		},
		attributes: [
			"id",
			"photo",
			[sequelize.literal(`"photos"."title"`), "TitleFilm"],
		],
		subQuery: false,
		include: [
			{
				model: Film,
				as: "photos",
				attributes: [],
			},
		],
	})
		.then((data) => {
			return res.status(400).json({
				status: "Success",
				data: data,
			});
		})
		.catch((err) => {
			return res.status(400).json({
				status: "fail",
			});
		});
};

const updatePhoto = async (req, res) => {
	const { id } = req.params;
	await Photo.update(req.body, {
		where: {
			id: id,
		},
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
			});
		});
};

const deletePhoto = async (req, res) => {
	const { id } = req.params;

	await Photo.destroy({
		where: {
			id: id,
		},
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
			});
		});
};

module.exports = {
	addPhoto,
	updatePhoto,
	deletePhoto,
	allPhoto,
	getPhotoByPhoto,
};
