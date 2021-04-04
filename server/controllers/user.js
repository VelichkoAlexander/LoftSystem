const db = require("../models/user");
const {serializeUser} = require('../helpers/serialize');
const token = require('../auth/token');

const registration = async (req, res) => {
  const {userName} = req.body;
  const user = await db.getUserByName(userName);

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

module.exports = {
  registration,
  login,
  getProfile,
  refreshTokens,
}