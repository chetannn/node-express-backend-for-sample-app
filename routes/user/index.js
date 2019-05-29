const express = require('express');
const router = express.Router();
const {  getAllUsers, getUserById, signup } = require('../../controllers/user');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/signup', signup);

module.exports = router;