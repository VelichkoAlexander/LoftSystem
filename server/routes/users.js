const express = require('express');
const router = express.Router();
const {getUsers, removeUser, updateUserPermission} = require('../controllers/user');
const {authenticate} = require('../auth/passport');

router.get('/users', authenticate, getUsers);
router.patch('/users/:id/permission', authenticate, updateUserPermission);
router.delete('/users/:id', authenticate, removeUser)

module.exports = router;