const User = require('./schems/Users');

module.exports.getUserByName = async (username) => {
  return User.findOne({username});
}

module.exports.getUserById = async (_id) => {
  return User.findById({_id});
}

module.exports.createUser = async (data) => {
  const {username, surName, firstName, middleName, password} = data;
  const newUser = new User({
    username,
    surName,
    firstName,
    middleName,
    image: null,
    permission: {
      chat: {C: true, R: true, U: true, D: true,},
      news: {C: true, R: true, U: true, D: true,},
      settings: {C: true, R: true, U: true, D: true,}
    },
  });

  newUser.setPassword(password);

  return await newUser.save();
}

