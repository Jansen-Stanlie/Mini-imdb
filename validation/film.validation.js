const joi = require("joi");
const validate = require("../middleware/validate.request");

const addValidationSchema = joi.object({
	firstName: joi.string().alphanum().min(3).max(15).required(),
	lastName: joi.string().alphanum().min(3).max(15).required(),
	password: joi.string().min(3).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	email: joi.string().email(),
});

function validateAddFilm(req, res, next) {
	validate(req, res, next, loginValidationSchema);
}

module.exports = {
	validateAddFilm,
};
