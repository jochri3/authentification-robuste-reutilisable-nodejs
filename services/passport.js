const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const bcrypt = require('bcrypt');

// 1. jwt-strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// 2.local strategy
const LocalStrategy = require('passport-local');

/**
 * 1.THIS IS THE JWT PASSPORT STRATEGY TO CHECK WHETHER/NOT USER IS AUTHENTICATED THROUGH IS TOKEN
 *   HERE ONLY THE TOKEN IS SENT.IN SOME WAYS THE USER HAD ALREADY RECEIVED A JWT FROM THE SERVER FROM A
 *   PREVIOUS AUTHENTICATION
 */
// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create JWT strategy
// The ()=> function is the function that will be called whenever a user attempts to login
// payload : decoded jwt token
// done : callback to call if auth is succefull/not
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the user is in the payload exists in our database
  // if it does call done with the user
  // Otherwise, call done without a user object
  try {
    const user = await User.findById(payload.sub);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin);

/**
 * END OF THE JWT-PASSEPORT STRATEGY
 */

/**
 * 2. LOCAL STRATEGY : FIRST TIME WHEN A USER LOGGS IN, HE SHOULD BE AUTHENTICATED BY
 *   EMAIL/PASSWORD,THAT'S WHAT"S CALLED LOCAL STRATEGY.
 *   AFTER AUTHENTICATION VIA A LOCAL STRATEGIE(EMAIL/PASSWORD) THEN THE SERVER WILL PROVIDE A TOKEN
 *   SO THAT FOR THE FOLLOW UP REQUEST THE AUTH STATE WILL WE VERIFIED BY TOKEN
 */

//  The password is detected automatically
const localStrategyOptions = {
  usernameField: 'email',
};
const localLogin = new LocalStrategy(
  localStrategyOptions,
  async (email, password, done) => {
    //   Verify this username/password,call done with the user
    //   If it's the correct username and password
    //   Otherwise call done with false
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false);

      // Compare passwords - is `password` equal to user.password?
      // const isMatch = await user.comparePassword(password);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use(localLogin);
/**
 * END LOCAL STRATEGY
 */
