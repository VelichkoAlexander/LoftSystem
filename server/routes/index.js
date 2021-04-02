const router = require('express').Router();

// API endpoints routes
router.use('/api', require('./user'));

module.exports = router;