const {
    sequelize,
	Genre,
    Film
} = require("../models/index");

const addGenre = async (req,res) => {
    const {id_film,genre} = req.body;

    await Genre.create({
        id_film: id_film,
        genre: genre
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(err => {
        res.status(400).json({
            status: "fail"
        })
    })
}

const allGenre = async (req,res) => {
    await Genre.findAll({
        attributes: [
            'id',
            'genre',
            [sequelize.literal(`"genres"."title"`), "TitleFilm"],
        ],
        subQuery: false,
        include: [{
            model: Film,
            as: 'genres',
            attributes: []
        }]
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(err => {
        res.status(400).json({
            status: "fail"
        })
    })
}

const getGenreByGenre = async (req,res) => {
    const {genre} = req.body;

    await Genre.findAll({
        where: {
            genre: genre
        },
        attributes: [
            'id',
            'genre',
            [sequelize.literal(`"genres"."title"`), "TitleFilm"],
        ],
        subQuery: false,
        include: [{
            model: Film,
            as: 'genres',
            attributes: []
        }]
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(err => {
        res.status(400).json({
            status: "fail"
        })
    })
}

const updateGenre = async (req,res) => {
    const {id} = req.params;
    await Genre.update(req.body,{
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(err => {
        res.status(400).json({
            status: "fail"
        })
    })
}

const deleteGenre = async (req,res) => {
    const {id} = req.params;

    await Genre.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(err => {
        res.status(400).json({
            status: "fail"
        })
    })
}


module.exports = {
    addGenre,
    updateGenre,
    deleteGenre,
    allGenre,
    getGenreByGenre
}