const jwt = require('jwt-simple');
const config = require('../config');
module.exports = function (user) {
  const timestamp = new Date().getTime();
  // sub : subject(who is this token about).This property is a standard
  // iat : issue at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};
