const User = require('./schems/Users');

module.exports.getUserByName = async (username) => {
  return User.findOne({username});
}

module.exports.getUserById = async (id) => {
  return User.findById({_id: id});
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

module.exports.getUsers = async () => {
  return User.find()
}

module.exports.removeUser = async (id) => {
  return User.findByIdAndRemove({_id: id});
}

module.exports.updateUserPermission = async (id, data) => {
  return User.findByIdAndUpdate({_id: id}, {$set: data});
}
module.exports.updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(
    {_id: id},
    {$set: data},
    {new: true},
  );
  user.setPassword(data.newPassword);
  user.save();
  return user;

}

