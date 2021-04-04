const db = require("../models/news");
const {bulkSerializeNews} = require('../helpers/serialize');

const getNews = async (req, res) => {
  const news = await db.getNews();
  if (!news) {
    return res.status(200).json([]);
  }
  res.status(200).json(
    bulkSerializeNews(news)
  )
}

const createNews = async (req, res) => {
  try {
    const params = {
      ...req.body,
      user: req.user,
    };
    await db.createNews(params);
    return await getNews(req, res);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const updateNews = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404).json({message: 'No present news id'});
    }
    await db.updateNews(req.params.id, req.body);
    return await getNews(req, res);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const removeNews = async (req, res) => {
  try {
    await db.removeNews(req.params.id);
    return await getNews(req, res);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

module.exports = {
  getNews,
  createNews,
  updateNews,
  removeNews,
}