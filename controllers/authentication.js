import User from '../models/user';
import generateHashedPassword from '../lib/generate.hashed.password';
import generateJWT from '../lib/token.for.user';

/**
 * POST /api/auth/signup
 */
const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(422)
      .send({ error: 'Vous devez fournir un le mail et le mot de passe' });
  // 1. Verifier si l'utilisateur avec l'ID donné existe
  const user = await User.findOne({ email });

  // 2.Si un utilisateur avec cette adresse mail existe déjà renvoyer une erreur
  if (user) {
    return res.status(422).send({ error: 'Email déjà utilisé' });
  }
  // 3.Si aucun utilisateur avec cette adresse email n'existe, on en crée un

  const newUser = new User({ email, password });
  const hashedPassword = await generateHashedPassword(password);
  newUser.password = hashedPassword;
  await newUser.save();
  // 4.On envoi une reponse avec un token/jeton d'authentification
  res.json({ token: generateJWT(newUser) });
};

/**
 * POST /api/auth/signin
 */
const signin = async (req, res) => {
  // Ici le couple email/mot de passe a déjà été vérifié dans un autre middleware
  res.send({ token: generateJWT(req.user) });
};

export default {
  signin,
  signup,
};
