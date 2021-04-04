module.exports.serializeUser = (user) => {
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

module.exports.serializeNews = (news) => {
  console.log(news)
  return {
    id: news._id,
    title: news.title,
    text: news.text,
    created_at: news.created_at,
    user: news.user,
  }
};