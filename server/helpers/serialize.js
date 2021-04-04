const serializeUser = (user) => {
  return {
    id: user.id,
    firstName: user.firstName,
    middleName: user.middleName,
    surName: user.surName,
    username: user.username,
    image: user.image,
    permission: user.permission,
  }
};

const serializeNews = (news) => {
  return {
    id: news._id,
    title: news.title,
    text: news.text,
    created_at: news.created_at,
    user: news.user,
  }
};

const bulkSerializeNews = (news) => news.map((news) => serializeNews(news));
const bulkSerializeUser = (users) => users.map((user) => serializeUser(user));

module.exports = {
  serializeNews,
  serializeUser,
  bulkSerializeNews,
  bulkSerializeUser,
}