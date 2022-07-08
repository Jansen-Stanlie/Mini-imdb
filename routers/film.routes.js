const express = require("express");
const {
	addFilm,
    updateFilm,
    allFilm,
    deleteFilm
} = require("../controllers/film.controller");

const router = express.Router();
const { verifyAdmin } = require("../middleware/auth");
// const { validateProduct } = require("../validation/product.validation");

router.post("/addFilm",verifyAdmin,addFilm);
router.get('/',allFilm)
router.put("/updateFilm/:id",verifyAdmin,updateFilm);
router.delete("/deleteFilm/:id",verifyAdmin,deleteFilm);
module.exports = router;