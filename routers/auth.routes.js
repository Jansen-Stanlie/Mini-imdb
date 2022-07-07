const express = require("express");
const { signIn, signUp } = require("../controllers/auth.controller");
const router = express.Router();
const {
	validateRegister,
	validatelogin,
} = require("../validation/user.validation");

router.post("/logIn", validatelogin, signIn);
router.post("/Register", validateRegister, signUp);

module.exports = router;