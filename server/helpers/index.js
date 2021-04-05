const db = require('../models/user');

const validation = async (id, fields, files) => {
  if (files.avatar.name === '' || files.avatar.size === 0) {
    return {message: 'No Avatar', err: true}
  }
  if (!fields.newPassword) {
    return {message: 'No new password', err: true}
  }
  if (!fields.oldPassword) {
    return {message: 'No old password', err: true}
  }

  const user = await db.getUserById(id)
  if (!user.validatePassword(fields.oldPassword)) {
    return {message: 'No right password', err: true}
  }

  return {message: 'OK', err: false}
}

module.exports = {
  validation,
}