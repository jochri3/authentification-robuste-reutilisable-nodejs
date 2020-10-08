// import User from '../models/user';
const User = require('../models/user');
const generateHashedPassword = require('../lib/generate.hashed.password');
const generateJWT = require('../lib/token.for.user');

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  // 1. See if a user with tge given email exists
  const user = await User.findOne({ email });

  // 2.If a user with email does exist, return an error
  if (user) {
    return res.status(422).send({ error: 'Email is already in use' });
  }
  // 3.If a user with does NOT exist, create and save user record

  const newUser = new User({ email, password });
  const hashedPassword = await generateHashedPassword(password);
  newUser.password = hashedPassword;
  await newUser.save();
  // 4.Respond to request indicating the user was created
  res.json({ token: generateJWT(newUser) });
};

exports.signin = async (req, res) => {
  // User has already thei email and password,we just neer to give them a token
  res.send({ token: generateJWT(req.user) });
};
