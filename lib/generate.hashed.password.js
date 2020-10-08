import bcrypt from 'bcrypt';

/**
 * Générer un mot de pass hashé avec bcrypt
 * @param {String} password
 */
export default async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
