const db = require("../models/user");
const {serializeUser, bulkSerializeUser} = require('../helpers/serialize');
const token = require('../auth/token');
const formidable = require('formidable');

const registration = async (req, res) => {
  const {username} = req.body;
  const user = await db.getUserByName(username);

  if (user) {
    return res.status(409).json({message: 'User exists'});
  }

  try {
    const newUser = await db.createUser(req.body);

    res.status(200).json({
      ...serializeUser(newUser)
    })
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const login = async (req, res) => {
  const tokens = await token.createTokens(req.user);
  res.json({
    ...serializeUser(req.user),
    ...tokens,
  });
}

const getProfile = (req, res) => {
  res.json({
    ...serializeUser(req.user)
  })
}

const refreshTokens = async (req, res) => {
  const refreshToken = await req.headers['authorization'];
  const tokens = await token.refreshTokens(refreshToken)

  res.json({...tokens});
}

const getUsers = async (req, res) => {
  const users = await db.getUsers();
  res.status(200).json(bulkSerializeUser(users));
}

const removeUser = async (req, res) => {
  try {
    await db.removeUser(req.params.id);
    return await getUsers(req, res);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const updateUserPermission = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404).json({message: 'No present user id'});
    }
    await db.updateUserPermission(req.params.id, req.body);
    return await getUsers(req, res);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const updateUser = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields) {
    if (err) {
      next(err);
      return;
    }
    try {
      let user = req.user
      user = await db.updateUser(user.id, fields);
      res.json({
        ...serializeUser(user),
      });
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  })
}

module.exports = {
  registration,
  login,
  getProfile,
  refreshTokens,
  getUsers,
  removeUser,
  updateUserPermission,
  updateUser,
}