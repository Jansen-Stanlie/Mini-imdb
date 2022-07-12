const express = require("express");
const { addPhoto,
    updatePhoto,
    deletePhoto,
    allPhoto,
    getPhotoByPhoto
} = require("../controllers/photo.controller");
const router = express.Router();
const {
    verifyAdmin
} = require("../middleware/auth");

router.post("/", verifyAdmin ,addPhoto);
router.get("/", allPhoto);
router.get("/byPhotoUrl", getPhotoByPhoto);
router.put("/:id", verifyAdmin ,updatePhoto);
router.delete("/:id", verifyAdmin ,deletePhoto);
// router.post("/Register", validateRegister, signUp);

module.exports = router;