const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const common = require("./webRoutes");

// Prefix untuk setiap route
router.use("/users", userRoutes);
router.use("/a", common);

module.exports = router;
