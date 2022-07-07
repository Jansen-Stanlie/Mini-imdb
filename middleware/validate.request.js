function validateRequest(req, res, next, schema) {
	const { error, value } = schema.validate(req.body);
	if (error) {
		console.log(error);
		return res.status(400).send({
			message: "Bad Request",
			error: error.message,
		});
	}
	req.body = value;
	next();
}
module.exports = validateRequest;