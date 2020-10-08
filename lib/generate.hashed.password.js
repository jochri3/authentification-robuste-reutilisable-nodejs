const bcrypt = require('bcrypt');

/**
 * Generate hashed password using bcrypt
 * @param {String} password
 */
async function generateHashedPassword(password) {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

module.exports = generateHashedPassword;
