const { Film,
     Genre ,
     Category,
     Rating,
     Actor,
     sequelize } = require('../models/index')


const addFilm = async(req,res) => {
    const {
        id_genre,
        id_category,
        title,
        year,
        director
    } = req.body;

   

    Film.findOne({
        where: {
            title: title
        }
    }).then(data => {
        if(data){
            res.status(404).json({
                status: 'Failed to add film',
                message: 'Film already exist'
            })
        }

        Film.create({
            id_genre: id_genre,
            id_category: id_category,
            title: title,
            director: director,
            year: year
        }).then(data => {
            res.status(200).json({
                status: 'Success',
                message: 'add film is success',
                data: data
            })
        }).catch(err => {
            res.status(400).json({
                status: 'Failed',
                message: "Failed to Add film"
            })
        })
    })
}

const allFilm = async (req,res) => {
    const allRating = await Rating.findAll();
    let ratingParse = JSON.parse(JSON.stringify(allRating));
    const averages = [...ratingParse
        // get list of month/values
        .reduce((map, { id_film, rating }) => map.set(id_film, [...(map.get(id_film) || []), rating]), new Map) ]
        .map(([id_film, rating]) => ({ id_film, rating: rating.reduce((sum, val) => sum + val, 0) / rating.length }));
   
    
    await Film.findAll({
        attributes: [
            'id',
            'title',
            'year',
            'director',
            [sequelize.literal(`"category"."category"`), "categoryFilm"],
        ],
        subQuery: false,
        include:[{
            model: Genre,
            as: 'genre',
            attributes: [
                'genre'
            ]
        },{
            model: Category,
            as: 'category',
            attributes:[]
        }]
    }).then(data => {
        const dataFilm = JSON.parse(JSON.stringify(data));
        
        res.status(200).json({
            status: 'success',
            data: dataFilm
        })
    }).catch(err => {
        res.status(400).json({
            status: 'Fail'
        })
    })
}

const getFilmByTitle = async (req,res) => {
    const {title} = req.body;
    let sum = 0,avg;

    const filmId = await Film.findOne({
        where: {
            title: title
        }
    })

    const rating = await Rating.findAll({
        where: {
            id_film: filmId.id
        }
    })

    const ratingFilm = JSON.parse(JSON.stringify(rating))
    for(let i = 0;i < ratingFilm.length; i++){
        sum += ratingFilm[i].rating
    }

    avg = sum / ratingFilm.length

    await Film.findAll({
        where:{
            title: title
        },attributes: [
            'id',
            'title',
            'year',
            'director',
            [sequelize.literal(`"category"."category"`), "categoryFilm"],
        ],
        subQuery: false,
        include:[{
            model: Genre,
            as: 'genre',
            attributes: [
                'genre'
            ]
        },{
            model: Actor,
            as: 'actor',
            attributes: ['name']
        },{
            model: Category,
            as: 'category',
            attributes:[]
        }]
    }).then(data => {
        res.status(200).json({
            data: data,
            rating: avg
        })
    })
}

const getFilmByCategory = async (req,res) => {
    const {category} = req.body;

    await Category.findAll({
        where: {
            category: category
        },
        attributes: [
            'category',
            [sequelize.literal(`"categoryFilm"."title"`), "TitleFilm"],
            [sequelize.literal(`"categoryFilm"."year"`), "YearFilm"]
            
        ],
        subQuery: false,
        include: [{
            model: Film,
            as: 'categoryFilm',
            attributes: []
        }]
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(err => {
        res.status(400).json({
            status: 'Failed'
        })
    })
}

const getFilmByGenre = async (req,res) => {
    const {genre} = req.body;

    await Genre.findAll({
        where: {
            genre: genre
        },
        attributes: [
            'genre',
            [sequelize.literal(`"genreFilm"."title"`), "TitleFilm"],
            [sequelize.literal(`"genreFilm"."year"`), "YearFilm"]
        ],
        subQuery: false,
        include: {
            model: Film,
            as: 'genreFilm',
            attributes: []
        }
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(err => {
        res.status(400).json({
            status: 'Fail'
        })
    })
}

const updateFilm = async (req,res) => {
    const {id} = req.params;

    await Film.update(req.body,{
        where: {
            id: id
        }
    }).then(data =>{
        res.status(200).json({
            status: 'Success',
            message: "Update Film is Success",
            data: data
        })
    }).catch(err => {
        res.status(400).json({
            status: "Failed",
            message: "fail to edit film"
        })
    })
}

const deleteFilm = async (req,res) => {
    const {id} = req.params;
// First, we start a transaction and save it into a variable
    try {
        const result = await sequelize.transaction(async (t) => {
            const genre = await Genre.destroy({
                where: {
                  id_film: id
                }
              }, { transaction: t })

              const category = await Category.destroy({
                where: {
                  id_film: id
                }
              }, { transaction: t })  

            const film = await Film.destroy({
                where: {
                  id: id
                }
              }, { transaction: t })   
              
            res.status(200).json({
                status: 'Success',
                message: "Berhasil Menghapus Film"
            })
        });
    } catch (error) {
        return res.status(400).json({
            status: 'Gagal',
            message: 'Gagal menambahkan User'
        })
    }
    
}

module.exports = {
    addFilm,
    updateFilm,
    allFilm,
    deleteFilm,
    getFilmByTitle,
    getFilmByCategory,
    getFilmByGenre
}