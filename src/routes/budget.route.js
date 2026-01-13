const express = require("express");
const auth = require("../middlewares/auth");
const { createBudget } = require("../controllers/budget.controller");

const router = express.Router();

router.use(auth);

// CREATE budget
router.post("/budgets", createBudget);

module.exports = router;