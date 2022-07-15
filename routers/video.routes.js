const express = require("express");
const { addVideo,
    updateVideo,
    deleteVideo,
    allVideo,
    getVideoByVideo
} = require("../controllers/video.controller");
const router = express.Router();
const {
    verifyAdmin
} = require("../middleware/auth");

router.post("/", verifyAdmin ,addVideo);
router.get("/", allVideo);
router.get("/byVideoUrl", getVideoByVideo);
router.put("/:id", verifyAdmin ,updateVideo);
router.delete("/:id", verifyAdmin ,deleteVideo);
// router.post("/Register", validateRegister, signUp);

module.exports = router;