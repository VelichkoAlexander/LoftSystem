const db = require("../db");
const {serializeUser} = require('../helpers/serialize');
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

const login = async ({user}, res) => {
    const tokens = await token.createTokens(user);

    res.json({
       ...serializeUser(user),
        ...tokens,
    });
}

module.exports = {
    registration,
    login,
}