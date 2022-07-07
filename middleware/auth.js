const jwt = require("jsonwebtoken");
const Roles = require("../models/index").Role;

const privateKey = "my-secret";

const verify = async (req, res, next) => {
	const token = req.headers["auth"];
	jwt.verify(token, privateKey, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				err: err,
			});
		}
		req.id = decoded.id;
		req.email = decoded.email;
		next();
	});
};

const tokenVerify = async (req, res, next) => {
	const token = req.headers["auth"];

	if (token === undefined) {
		return res.status(401).send({
			err: "Forbidden",
		});
	}
	next();
};
const verifyAdmin = async (req, res, next) => {
	const token = req.headers["auth"];

	if (token === undefined) {
		return res.status(401).send({
			err: "Forbidden",
		});
	}

	jwt.verify(token, privateKey, async (err, decoded) => {
		const id = decoded.id;
		console.log("user_id", id);
		const userRole = await Roles.findOne({
			where: {
				user_id: id,
			},
		});
		console.log("Role: ", userRole);
		if (userRole === null || userRole.role !== "ADMIN") {
			return res.status(401).send({
				err: "Forbiden, Only admin can Access",
			});
		}

		next();
	});
};

const generate = (payload) => {
	return jwt.sign(payload, privateKey, {
		algorithm: "HS256",
		expiresIn: "1h",
	});
};

module.exports = {
	verify,
	generate,
	verifyAdmin,
	tokenVerify,
};