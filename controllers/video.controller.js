const {
    sequelize,
	Video,
    Film
} = require("../models/index");

const addVideo = async (req,res) => {
    const {id_film,videoUrl} = req.body;

    await Video.create({
        id_film: id_film,
        videoUrl: videoUrl
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

const allVideo = async (req,res) => {
    await Video.findAll({
        attributes: [
            'id',
            'videoUrl',
            [sequelize.literal(`"videos"."title"`), "TitleFilm"],
        ],
        subQuery: false,
        include: [{
            model: Film,
            as: 'videos',
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

const getVideoByVideo = async (req,res) => {
    const {videoUrl} = req.body;

    await Genre.findAll({
        where: {
            videoUrl: videoUrl
        },
        attributes: [
            'id',
            'videoUrl',
            [sequelize.literal(`"videos"."title"`), "TitleFilm"],
        ],
        subQuery: false,
        include: [{
            model: Film,
            as: 'videos',
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

const updateVideo = async (req,res) => {
    const {id} = req.params;
    await Video.update(req.body,{
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

const deleteVideo = async (req,res) => {
    const {id} = req.params;

    await Video.destroy({
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
    addVideo,
    updateVideo,
    deleteVideo,
    allVideo,
    getVideoByVideo
}