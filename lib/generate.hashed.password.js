import bcrypt from 'bcrypt';
import configToUse from '../config/keys';

/**
 * Générer un mot de pass hashé avec bcrypt
 * @param {String} password
 */
export default async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(configToUse.saltRound));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
