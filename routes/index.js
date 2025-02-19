const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const common = require("./webRoutes");
const authRoutes = require("./authRoutes");

// Prefix untuk setiap route
router.use("/users", userRoutes);
router.use("/a", common);
router.use("/auth", authRoutes);

module.exports = router;
