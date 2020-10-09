import jwt from 'jwt-simple';
import configToUse from '../config/keys';

/**
 * @param {Object} user
 */
export default (user) => {
  // sub : subject(ou sujet en FR qui veut dire, à qui ce token appartient).Cette propriété est un standard de JWT
  const timestamp = new Date().getTime();
  // iat : issue at time ou l'heure à laquelle le token a été délivré
  return jwt.encode({ sub: user.id, iat: timestamp }, configToUse.jwtSecret);
};
