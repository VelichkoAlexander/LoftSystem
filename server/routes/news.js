const express = require('express');
const router = express.Router();
const {authenticate} = require('../auth/passport');
const newsController = require('../controller/news');

router.get('/news', newsController.getNews);
router.post('/news', authenticate, newsController.createNews);
router.patch('/news/:id', authenticate, newsController.updateNews);
router.delete('/news/:id', authenticate, newsController.removeNews);

module.exports = router;