import Authentication from './controllers/authentication';
import './services/passport';
import passeport from 'passport';
import { Router } from 'express';

const authRouter = Router();
const autreRessource = Router();

// {session:false} => Si l'utilisateur est connecté ne pas créer de session,car l'authentification
//                    se fait par le token et non les cookies/session
const requireAuth = passeport.authenticate('jwt', { session: false });
const requireSignin = passeport.authenticate('local', { session: false });

/**
 * AUTH ROUTER
 */

authRouter.post('/signin', requireSignin, Authentication.signin);
authRouter.post('/signup', Authentication.signup);

/**
 * AUTRES RESSOURCES PROTEGEE
 * Ceci est une route de test, mais ca pourrait n'importe quelle route
 * requireAuth est le middleware qui protège la route, tout comme on peut ne pas en avoir
 */
// Middleware
autreRessource.get('/', requireAuth, (req, res) => {
  res.send({
    message: 'Voici comment proteger une route par authentification',
  });
});

export default {
  authRouter,
  autreRessource,
};
