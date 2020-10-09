export default (logger) => {
  return function (err, req, res, next) {
    logger.error(err.message, err);
    res.status(500).send('Erreur du serveur');
  };
};
