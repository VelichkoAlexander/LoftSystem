const express = require('express');
const router = express.Router();
const {registration, login, getProfile, refreshTokens, updateUser} = require('../controllers/user');
const {authenticate, authorization} = require('../auth/passport');

router.post('/registration', registration);
router.post('/login', authorization, login);
router.get('/profile', authenticate, getProfile);
router.post('/refresh-token', refreshTokens);
router.patch('/profile', authenticate, updateUser );


module.exports = router;
