const express = require("express");
const { addGenre,
    updateGenre,
    deleteGenre,
    allGenre,
    getGenreByGenre
} = require("../controllers/genre.controller");
const router = express.Router();
const {
    verifyAdmin
} = require("../middleware/auth");

router.post("/addGenre", verifyAdmin ,addGenre);
router.get("/", allGenre);
router.get("/byGenre", getGenreByGenre);
router.put("/:id", verifyAdmin ,updateGenre);
router.delete("/:id", verifyAdmin ,deleteGenre);
// router.post("/Register", validateRegister, signUp);

module.exports = router;