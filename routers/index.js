const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const film = require("./film.routes");
const Comment = require("./comment.routes");
const Actor = require("./actor.routes");
const Category = require("./category.routes");
const Genre = require("./genre.routes");
const Photo = require("./photo.routes");
const Video = require("./video.routes");

router.use("/auth", auth);
router.use("/film", film);
router.use("/comment", Comment);
router.use("/actor", Actor);
router.use("/category", Category);
router.use("/genre", Genre);
router.use("/photo", Photo);
router.use("/video", Video);
module.exports = router;
