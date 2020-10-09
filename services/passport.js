import passport from 'passport';
import User from '../models/user';
import configToUse from '../config/keys';
import bcrypt from 'bcrypt';

// 1. jwt-strategy
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// 2.local strategy ou stratégie locale
import LocalStrategy from 'passport-local';

/**
 * C'EST LA STRATÉGIE DE "passport-jwt" POUR VÉRIFIER SI L'UTILISATEUR EST AUTHENTIFIÉ OU NON PAR LE TOKEN
 *  ICI SEUL LE JETON EST ENVOYÉ. D'UNE CERTAINE MANIÈRE, L'UTILISATEUR AVAIT DÉJÀ REÇU UN JWT DU SERVEUR
 *  LORS D'UNE PRÉCÉDENTE AUTHENTIFICATION
 */
// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: configToUse.jwtSecret,
};

// Création d'une basée sur JWT
// La fonction (payload,done)=> est celle qui est appelée à chaque fois que l'utilisateur tente de s'authentifier
// payload : jwt décodé
// done : la fonction de callback qui est appelée si l'authentification réussie ou échoue
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // 1.Vérifier si l'utilisateur dont les données se trouvant dans le payload existe dans la base de données
  // 2.S'il existe,on appel la fonction done avec cet utilisateur
  // 3.Sinon, on appelle avec la fonction sans spécifier un utilisateur(car non trouvé)
  try {
    const user = await User.findById(payload.sub);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Dire à passeport JS de se servir de la strategie "jwtLogin"
passport.use(jwtLogin);

/**
 * FIN DE LA STRATEGIE passeport-jwt
 */

/**
 * 2. STRATÉGIE LOCALE : LA PREMIÈRE FOIS QU'UN UTILISATEUR SE CONNECTE, IL DOIT ÊTRE AUTHENTIFIÉ PAR
 * EMAIL/MOT DE PASSE, C'EST CE QU'ON APPELLE LA STRATÉGIE LOCALE.
 * APRÈS AUTHENTIFICATION VIA UNE STRATÉGIE LOCALE (CEMAIL/MOT DE PASSE), LE SERVEUR FOURNIT UN JETON(TOKEN)
 * POUR LES AUTRES REQUETE QUI VIENNENT APRES, LA VERIFICATION SE FONT VIA LE TOKEN
 */

//  Ici, le mot de passe est detecté automatiquement même s'il n'est pas spécifié dans l'objet
const localStrategyOptions = {
  // usernameField, c'est à toi de definir la valeur qui sera dans req.body
  // Pour le mot de passe,par defaut passeport va deviner en cherchant le champ password
  // Sinon, vous pourriez aussi rajouter passwordField:'motDePasse' si c'est un nom en francais
  usernameField: 'email',
};
const localLogin = new LocalStrategy(
  localStrategyOptions,
  async (email, password, done) => {
    //   1. Verify this username/password,call done with the user
    //   2. If it's the correct username and password
    //   3. Otherwise call done with false

    const user = await User.findOne({ email });
    if (!user) return done(null, false);

    // Comparaison des mots de passe -  `password` est il égal à user.password?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false);
    }
    return done(null, user);
  }
);

passport.use(localLogin);
/**
 * FIN DE LA STRATEGIE LOCALE
 */
