module.exports.serializeUser = (user) => {
    return {
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        surName: user.surName,
        userName: user.userName,
        image: user.image,
        permission: user.permission,
    }
}