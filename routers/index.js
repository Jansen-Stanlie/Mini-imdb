const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const film = require("./film.routes");
const Comment = require("./comment.routes");

router.use("/auth", auth);
router.use("/film", film);
router.use("/comment", Comment);

module.exports = router;
