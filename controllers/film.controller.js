const { Film, Genre, Category, Rating, sequelize } = require("../models/index");

const addFilm = async (req, res) => {
	const { genre, category, title, year, director } = req.body;
	console.log("genre", genre);
	console.log("director", director);

	Film.findOne({
		where: {
			title: title,
		},
	}).then((data) => {
		if (data) {
			return res.status(404).json({
				status: "Failed to add film",
				message: "Film already exist",
			});
		}
		if (director.length > 1) {
			Film.create({
				title: title,
				director: director.toString(),
				year: year,
			})
				.then((datas) => {
					genre.map((genres) => {
						console.log(genres);
						Genre.create({
							id_film: datas.id,
							genre: genres,
						});
					});
					Category.create({
						id_film: datas.id,
						category: category,
					});
				})
				.then((data) => {
					res.status(200).json({
						status: "Success",
						message: "film is added",
					});
				})
				.catch((err) => {
					res.status(400).json({
						status: "Failed",
						message: err,
					});
				});
		}
		Film.create({
			title: title,
			director: director,
			year: year,
		})
			.then((datas) => {
				genre.map((genres) => {
					console.log(genres);
					Genre.create({
						id_film: datas.id,
						genre: genres,
					});
				});
				Category.create({
					id_film: datas.id,
					category: category,
				});
			})
			.then((data) => {
				res.status(200).json({
					status: "Success",
					message: "film is added",
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: "Failed",
					message: err,
				});
			});
	});
};

const allFilm = async (req, res) => {
	await Film.findAll({
		attributes: [
			"id",
			"title",
			"year",
			"director",
			[sequelize.literal(`"category"."category"`), "categoryFilm"],
		],
		subQuery: false,
		include: [
			{
				model: Genre,
				as: "genre",
				attributes: ["genre"],
			},
			{
				model: Category,
				as: "category",
				attributes: [],
			},
		],
	})
		.then((data) => {
			res.status(200).json({
				status: "success",
				data: data,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: err,
			});
		});
};

const getFilmByTitle = async (req, res) => {
	const { title } = req.body;
	let sum = 0,
		avg;

	const filmId = await Film.findOne({
		where: {
			title: title,
		},
	});

	const rating = await Rating.findAll({
		where: {
			id_film: filmId.id,
		},
	});

	const ratingFilm = JSON.parse(JSON.stringify(rating));
	for (let i = 0; i < ratingFilm.length; i++) {
		sum += ratingFilm[i].rating;
	}

	avg = sum / ratingFilm.length;

	await Film.findAll({
		where: {
			title: title,
		},
		attributes: [
			"id",
			"title",
			"year",
			"director",
			[sequelize.literal(`"category"."category"`), "categoryFilm"],
		],
		subQuery: false,
		include: [
			{
				model: Genre,
				as: "genres",
				attributes: ["genre"],
			},
			{
				model: Category,
				as: "categories",
				attributes: [],
			},
		],
	}).then((data) => {
		res.status(200).json({
			data: data,
			rating: avg,
		});
	});
};

const updateFilm = async (req, res) => {
	const { id } = req.params;

	await Film.update(req.body, {
		where: {
			id: id,
		},
	})
		.then((data) => {
			res.status(200).json({
				status: "Success",
				message: "Update Film is Success",
				data: data,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "Failed",
				message: "fail to edit film",
			});
		});
};

const deleteFilm = async (req, res) => {
	const { id } = req.params;
	// First, we start a transaction and save it into a variable
	try {
		const result = await sequelize.transaction(async (t) => {
			const genre = await Genre.destroy(
				{
					where: {
						id_film: id,
					},
				},
				{ transaction: t }
			);

			const category = await Category.destroy(
				{
					where: {
						id_film: id,
					},
				},
				{ transaction: t }
			);

			const film = await Film.destroy(
				{
					where: {
						id: id,
					},
				},
				{ transaction: t }
			);

			res.status(200).json({
				status: "Success",
				message: "Berhasil Menghapus Film",
			});
		});
	} catch (error) {
		return res.status(400).json({
			status: "Gagal",
			message: "Gagal menambahkan User",
		});
	}
};

module.exports = {
	addFilm,
	updateFilm,
	allFilm,
	deleteFilm,
	getFilmByTitle,
};