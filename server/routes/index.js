const router = require('express').Router();

// API endpoints routes
router.use('/api', require('./user'));
router.use('/api', require('./news'));

module.exports = router;