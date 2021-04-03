const express = require('express');
const router = express.Router();
const {registration, login, getProfile} = require('../controller/user');
const {authenticate, authorization} = require('../auth/passport');

router.post('/registration', registration);
router.post('/login', authorization, login);
router.get('/profile', authenticate, getProfile);
// router.post('/refresh-token', (req, res, next) => {
//
// });
// router.patch('/profile', (req, res, next) => {
//
// });


module.exports = router;
