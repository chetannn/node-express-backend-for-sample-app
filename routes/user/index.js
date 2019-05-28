const express = require('express');
const router = express.Router();
const {  getAllUsers, getUserById } = require('../../controllers/user');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);

module.exports = router;