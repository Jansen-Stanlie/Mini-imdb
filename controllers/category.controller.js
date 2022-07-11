const {
    sequelize,
	Category,
    Film
} = require("../models/index");

const addCategory = async (req,res) => {
    const {id_film,category} = req.body;

    await Category.create({
        id_film: id_film,
        category: category
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

const allCategory = async (req,res) => {
    await Category.findAll({
        attributes: [
            'id',
            'category',
            [sequelize.literal(`"categories"."title"`), "TitleFilm"],
        ],
        subQuery: false,
        include: [{
            model: Film,
            as: 'categories',
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

const getCategoryByCategory = async (req,res) => {
    const {category} = req.body;

    await Category.findAll({
        where: {
            category: category
        },
        attributes: [
            'id',
            'category',
            [sequelize.literal(`"categories"."title"`), "TitleFilm"],
        ],
        subQuery: false,
        include: [{
            model: Film,
            as: 'categories',
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

const updateCategory = async (req,res) => {
    const {id} = req.params;
    await Category.update(req.body,{
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

const deleteCategory = async (req,res) => {
    const {id} = req.params;

    await Category.destroy({
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
    addCategory,
    updateCategory,
    deleteCategory,
    allCategory,
    getCategoryByCategory
}