const {
	Film,
	Genre,
	Category,
	Rating,
	sequelize,
	Photo,
	Video,
	Comment
} = require("../models/index");

const addFilm = async (req, res) => {
	const { genre, category, title, year, director, photoUrl, videoUrl } =
		req.body;

	Film.findOne({
		where: {
			title: title,
		},
	})
		.then((data) => {
			if (data) {
				return res.status(404).json({
					status: "Failed to add film",
					message: "Film already exist",
				});
			}
			Film.create({
				title: title,
				director: director.toString(),
				year: year,
			})
				.then((datas) => {
					genre.map((genres) => {
						Genre.create({
							id_film: datas.id,
							genre: genres,
						});
					});

					Category.create({
						id_film: datas.id,
						category: category,
					});

					videoUrl.map((urls) => {
						Video.create({
							id_film: datas.id,
							videoUrl: urls,
						});
					});

					return photoUrl.map((urls) => {
						Photo.create({
							id_film: datas.id,
							photoUrl: urls,
						});
					});
				})
				.then((data) => {
					return res.status(200).json({
						status: "Success",
						message: "film is added",
					});
				})
				.catch((err) => {
					return res.status(400).json({
						status: "Failed",
						message: err,
					});
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

const allFilm = async (req, res) => {
	const ratings = await Rating.findAll();
	let ratingsParse = JSON.parse(JSON.stringify(ratings));
	
	const averages = [...ratingsParse
		// get list of month/values
		.reduce((map, { id_film, rating }) => map.set(id_film, [...(map.get(id_film) || []), rating]), new Map) ]
		// get list of month/average
		.map(([id_film, rating]) => ({ id_film, rating: rating.reduce((sum, val) => sum + val, 0) / rating.length }));
		

	await Film.findAll({
		attributes: [
			"id",
			"title",
			"year",
			"director",
			[sequelize.literal(`"category"."category"`), "categoryFilm"],
			// [sequelize.fn("AVG", sequelize.col("rating.rating")), "avgRating"],
		],
		subQuery: false,
		raw: false,
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
			{
				model: Photo,
				as: "photo",
				attributes: ["photoUrl"],
			},
			{
				model: Video,
				as: "video",
				attributes: ["videoUrl"],
			},
			{
				model: Comment,
				as: "comment",
				attributes: ["comment"],
			}
		],
	})
		.then((data) => {
			// data.forEach((element, index, array) => {
			// 	// console.log(element.photo); // same myArray object 3 times
			// 	element.photo.forEach((element, index, array) => {
			// 		console.log(element.photoUrl.split(","));
			// 	});
			// });
			let dataParse = JSON.parse(JSON.stringify(data))

			for(let i = 0 ; i < averages.length ;i++){
				console.log(averages[i].id_film)
				dataParse.find(x => {
					if(x.id === averages[i].id_film){
						x.rating = averages[i].rating
					}
				})
			}

			return res.status(200).json({
				status: "success",
				data: dataParse,
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
				as: "genre",
				attributes: ["genre"],
			},
			{
				model: Category,
				as: "category",
				attributes: [],
			},
			{
				model: Photo,
				as: "photo",
				attributes: [],
			},
			{
				model: Comment,
				as: "comment",
				attributes: ["comment"],
			}
		],
	}).then((data) => {
		res.status(200).json({
			data: data,
			rating: avg,
		});
	});
};

const getFilmByGenre = async (req, res) => {
	const { genre } = req.body;
	const ratings = await Rating.findAll();
	let ratingsParse = JSON.parse(JSON.stringify(ratings));
	
	const averages = [...ratingsParse
		// get list of month/values
		.reduce((map, { id_film, rating }) => map.set(id_film, [...(map.get(id_film) || []), rating]), new Map) ]
		// get list of month/average
		.map(([id_film, rating]) => ({ id_film, rating: rating.reduce((sum, val) => sum + val, 0) / rating.length }));

	await Genre.findAll({
		where: {
			genre: genre,
		},
		attributes: [
			"genre",
			[sequelize.literal(`"genres"."id"`), "id"],
			[sequelize.literal(`"genres"."title"`), "TitleFilm"],
			[sequelize.literal(`"genres"."year"`), "YearFilm"],
			[sequelize.col(`"genres"."director"`), "DirectorFilm"],
		],
		subQuery: false,
		include: [
			{
				model: Film,
				as: "genres",
				attributes: ["id"],
				include: [
					{
						model: Category,
						as: "category",
						attributes: ["category"],
					},
					{
						model: Photo,
						as: "photo",
						attributes: ["photoUrl"],
					},
					{
						model: Video,
						as: "video",
						attributes: ["videoUrl"],
					},
					{
						model: Comment,
						as: "comment",
						attributes: ["comment"],
					}
				],
			},
		],
	})
		.then((data) => {
			let dataParse = JSON.parse(JSON.stringify(data))

			for(let i = 0 ; i < averages.length ;i++){
				console.log(averages[i].id_film)
				dataParse.find(x => {
					if(x.id === averages[i].id_film){
						x.rating = averages[i].rating
					}
				})
			}
			res.status(200).json({
				status: "success",
				data: dataParse,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "Failed",
				err: err,
			});
		});
};

const getFilmByCategory = async (req, res) => {
	const { category } = req.body;
	const ratings = await Rating.findAll();
	let ratingsParse = JSON.parse(JSON.stringify(ratings));
	
	const averages = [...ratingsParse
		// get list of month/values
		.reduce((map, { id_film, rating }) => map.set(id_film, [...(map.get(id_film) || []), rating]), new Map) ]
		// get list of month/average
		.map(([id_film, rating]) => ({ id_film, rating: rating.reduce((sum, val) => sum + val, 0) / rating.length }));

	await Category.findAll({
		where: {
			category: category,
		},
		attributes: [
			"category",
			[sequelize.literal(`"categories"."id"`), "id"],
			[sequelize.literal(`"categories"."title"`), "TitleFilm"],
			[sequelize.literal(`"categories"."year"`), "YearFilm"],
			[sequelize.col(`"categories"."director"`), "DirectorFilm"],
			// [sequelize.col(`"categories"."director"`), "DirectorFilm"],
		],
		subQuery: false,
		include: [
			{
				model: Film,
				as: "categories",
				attributes: ["id"],
				include: [
					{
						model: Genre,
						as: "genre",
						attributes: ["genre"],
					},
					{
						model: Photo,
						as: "photo",
						attributes: ["photoUrl"],
					},
					{
						model: Video,
						as: "video",
						attributes: ["videoUrl"],
					},
					{
						model: Comment,
						as: "comment",
						attributes: ["comment"],
					}
					
				],
			},
		],
	})
		.then((data) => {
			let dataParse = JSON.parse(JSON.stringify(data))

			for(let i = 0 ; i < averages.length ;i++){
				console.log(averages[i].id_film)
				dataParse.find(x => {
					if(x.id === averages[i].id_film){
						x.rating = averages[i].rating
					}
				})
			}
			res.status(200).json({
				status: "success",
				data: dataParse,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "Failed",
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
	getFilmByGenre,
	getFilmByCategory,
};
