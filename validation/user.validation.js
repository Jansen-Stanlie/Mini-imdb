const joi = require("joi");
const validate = require("../middleware/validate.request");

const registerValidationSchema = joi.object({
	firstName: joi.string().alphanum().min(3).max(15).required(),
	lastName: joi.string().alphanum().min(3).max(15).required(),
	password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	email: joi.string().email(),
});

const loginValidationSchema = joi.object({
	password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	email: joi.string().email(),
});



function validatelogin(req, res, next) {
	validate(req, res, next, loginValidationSchema);
}
function validateRegister(req, res, next) {
	validate(req, res, next, registerValidationSchema);
}

module.exports = {
	validateRegister,
	validatelogin,
};