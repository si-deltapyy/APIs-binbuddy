const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const common = require("./webRoutes");
const authRoutes = require("./authRoutes");
const bankSampahRoutes = require("./bankSampahRoutes");

// Prefix untuk setiap route
router.use("/users", userRoutes);
router.use("/protect", common);
router.use("/auth", authRoutes);
router.use("/banksampah", bankSampahRoutes);
router.use("/transactions", require("./transactionRoutes"));
router.use("/customers", require("./customerRoutes"));
router.use("/balances", require("./balanceRoutes"));
router.use("/waste", require("./wasteRoutes"));
router.use("/wd", require("./withdrawlRoutes"));

module.exports = router;
