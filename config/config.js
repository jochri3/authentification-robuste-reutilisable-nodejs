// Fichier de configuration
// Ce fichier doit normalement être dans .gitignore car il peut contenir des informations sensibles
export default {
  production: {
    dbURL: '',
    jwtSecret: '',
    saltRound: '',
  },
  development: {
    dbURL: 'mongodb://localhost:27017/auth',
    jwtSecret: 'devjwtsecret',
    saltRound: 10,
  },
  test: {
    dbURL: '',
    jwtSecret: '',
    saltRound: '',
  },
};
