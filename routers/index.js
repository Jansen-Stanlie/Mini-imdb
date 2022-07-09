const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const film = require("./film.routes");

router.use("/auth", auth);
router.use("/film", film);


module.exports = router;