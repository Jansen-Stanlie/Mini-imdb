const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const film = require("./film.routes");
const Comment = require("./comment.routes");
const Actor = require("./actor.routes");
const Category = require("./category.routes");

router.use("/auth", auth);
router.use("/film", film);
router.use("/comment", Comment);
router.use("/actor", Actor);
router.use("/category", Category);

module.exports = router;
