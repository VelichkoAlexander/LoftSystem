const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET = 'secret';

const createTokens = async (user) => {
    const createToken = await jwt.sign(
        {
            user: {
                id: user.id
            },
        },
        SECRET,
        {
            expiresIn: '1m',
        },
    );

    const createRefreshToken = await jwt.sign(
        {
            user: {
                id: user.id,
            }
        },
        SECRET,
        {
            expiresIn: '7d',
        }
    );

    const verifyToken = jwt.decode(createToken, SECRET);
    const verifyRefresh = jwt.decode(createRefreshToken, SECRET);

    return {
        accessToken: createToken,
        refreshToken: createRefreshToken,
        accessTokenExpireAt: verifyToken.exp * 1000,
        refreshTokenExpireAt: verifyRefresh.exp * 1000,
    }
}

const refreshToken = async (refreshToken) => {
    const user = await getUserByToken(refreshToken);

    if (user) {
        return {
            ...(await createTokens(user))
        }
    } else {
        return {}
    }
}

const getUserByToken = async (token) => {
    let userId = -1;

    try {
        userId = await jwt.verify(token, SECRET).user.id;
    } catch (err) {
        return {}
    }

    return await db.getUserById(userId);
}

module.exports = {
    createTokens,
    refreshToken,
};