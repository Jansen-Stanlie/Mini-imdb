const express = require("express");
const {
	addFilm,
	updateFilm,
	allFilm,
	deleteFilm,
	getFilmByTitle,
} = require("../controllers/film.controller");

const router = express.Router();
const { verifyAdmin, verify } = require("../middleware/auth");

router.post("/addFilm", addFilm);

router.get("/", allFilm);
router.get("/byTitle", getFilmByTitle);
router.put("/updateFilm/:id", verify, verifyAdmin, updateFilm);
router.delete("/deleteFilm/:id", verify, verifyAdmin, deleteFilm);
module.exports = router;
