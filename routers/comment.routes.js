const express = require("express");
const { userFeedback } = require("../controllers/comment.controller");

const router = express.Router();

// const { validateProduct } = require("../validation/product.validation");

router.post("/addFeedback", userFeedback);

module.exports = router;
