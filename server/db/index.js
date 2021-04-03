const User = require('./schems/Users');

module.exports.getUserByName = async (username) => {
    return User.findOne({userName: username});
}

module.exports.getUserById = async (_id) => {
    return User.findById({_id});
}

module.exports.createUser = async (data) => {
    const {username: userName, surName, firstName, middleName, password} = data;
    const newUser = new User({
        userName,
        surName,
        firstName,
        middleName,
        image: null,
    });

    newUser.setPassword(password);

    return await newUser.save();
}