const { Film,
     Genre ,
     Category,
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
        res.status(200).json({
            status: 'success',
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
    deleteFilm
}