const express = require("express");
const {
	addActor,
	updateActor,
	deleteActor,
	allActor,
	getActorByName,
} = require("../controllers/actor.controller");
const router = express.Router();
const { verifyAdmin } = require("../middleware/auth");

// router.post("/", verifyAdmin ,addActor);
router.post("/addActor", addActor);
router.get("/", allActor);
router.get("/byName", getActorByName);
router.put("/:id", verifyAdmin, updateActor);
router.delete("/:id", verifyAdmin, deleteActor);
// router.post("/Register", validateRegister, signUp);

module.exports = router;
