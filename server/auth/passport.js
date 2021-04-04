const passport = require('passport');
const passportJwt = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const {getUserByName, getUserById} = require('../models/user');

const JwtStrategy = passportJwt.Strategy;

const params = {
  secretOrKey: 'secret',
  jwtFromRequest: (req) => {
    let token = null;

    if (req && req.headers) {
      token = req.headers['authorization'];
    }

    return token;
  }
}

// Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
      let user = null;
      try {
        user = await getUserByName(username);
      } catch (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (!user.validatePassword(password)) {
        return done(null, false)
      }

      done(null, user);
    }
  )
);

//Jwt Strategy
passport.use(
  new JwtStrategy(params, async (payload, done) => {
    let user = null;
    try {
      user = await getUserById(payload.user.id)
    } catch (err) {
      return done(err)
    }

    if (!user) {
      return done(new Error('User not found'));
    }

    return done(null, user);
  })
);

const authenticate = (req, res, next) => {
  return passport.authenticate('jwt', {session: false}, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        code: 401,
        message: 'Not authenticate',
      })
    }

    req.user = user;

    next();
  })(req, res, next)
}

const authorization = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      req.user = user;
    } else {
      return res.status(400).json({
        code: 400,
        message: 'authorization fail',
      });
    }

    next();
  })(req, res, next);
}

module.exports = {
  authenticate,
  authorization,
}