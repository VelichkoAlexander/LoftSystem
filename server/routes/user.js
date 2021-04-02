const express = require('express');
const router = express.Router();
const {registration, login} = require('../controller/user');

router.post('/registration', registration );
router.post('/login', login);
// router.post('/refresh-token', (req, res, next) => {
//
// });
// router.get('/profile', (req, res, next) => {
//     res.send('fiwre');
//
// });
// router.patch('/profile', (req, res, next) => {
//
// });


module.exports = router;
