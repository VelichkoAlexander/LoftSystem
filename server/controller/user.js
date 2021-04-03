const db = require("../db");
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
    console.log(req.user)
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
module.exports = {
    registration,
    login,
    getProfile,
}