const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');
router.use("/api/users",userRoutes);

const chirpRoutes = require('./chirpController');
router.use("/api/chirps",chirpRoutes);

const frontEndRoutes = require('./frontEndController');
router.use("/",frontEndRoutes);

module.exports = router;