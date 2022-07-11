const express = require("express");
const { addCategory,
    updateCategory,
    deleteCategory,
    allCategory,
    getCategoryByCategory
} = require("../controllers/category.controller");
const router = express.Router();
const {
    verifyAdmin
} = require("../middleware/auth");

router.post("/addCategory", verifyAdmin ,addCategory);
router.get("/", allCategory);
router.get("/byCategory", getCategoryByCategory);
router.put("/:id", verifyAdmin ,updateCategory);
router.delete("/:id", verifyAdmin ,deleteCategory);
// router.post("/Register", validateRegister, signUp);

module.exports = router;