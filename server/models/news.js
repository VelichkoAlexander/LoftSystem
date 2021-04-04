const News = require('./schems/News');

const getNews = async () => {
  return News.find();
}

const createNews = async (data) => {
  const newItemOfNews = new News(data);
  return await newItemOfNews.save();
}

const updateNews = async (id, data) => {
  return News.findByIdAndUpdate({ _id: id }, { $set: data });
}

const removeNews = async (id) => {
  return News.findByIdAndRemove({ _id: id });
}

module.exports = {
  getNews,
  createNews,
  updateNews,
  removeNews,
}