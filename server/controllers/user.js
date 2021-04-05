const db = require("../models/user");
const {serializeUser, bulkSerializeUser} = require('../helpers/serialize');
const {validation} = require('../helpers/index');
const token = require('../auth/token');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

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


const updateUser = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  const upload = path.join('./upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload)
  }

  form.uploadDir = path.join(process.cwd(), upload)
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    let user = req.user

    const valid = await validation(user._id, fields, files)

    if (valid.err) {
      if(files) {
        fs.unlinkSync(files.avatar.path)
      }
      return res.status(500).json({message: valid.message});
    }

    if(files) {
      const fileNameForSave = files.avatar.name.replace(/\s/g, '-')
      const fileName = path.join(upload, fileNameForSave)
      fs.rename(files.avatar.path, fileName, function (err) {
        console.log(err)
        if (err) {
          return res.status(500).json({message: err.message});
        }
      })

      fields.image = path.join('/upload', fileNameForSave);
    }

    try {
      user = await db.updateUser(user.id, fields);
      return res.json({
        ...serializeUser(user),
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({message: err.message});
    }
  });
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