const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const common = require("./webRoutes");
const authRoutes = require("./authRoutes");
const bankSampahRoutes = require("./bankSampahRoutes");

// Prefix untuk setiap route
router.use("/users", userRoutes);
router.use("/a", common);
router.use("/auth", authRoutes);
router.use("/banksampah", bankSampahRoutes);

module.exports = router;
