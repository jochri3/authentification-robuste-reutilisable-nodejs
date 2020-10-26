import router from '../router';
import express from 'express';
import errors from '../middlewares/errors';
import morgan from 'morgan';
import cors from 'cors';

const { authRouter, autreRessource } = router;

export default (app, logger) => {
  app.use(morgan('combined', { stream: logger.stream })); //framawork pour des logs
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(errors(logger));
  app.use('/api/auth', authRouter); //ceci peut etre n'importe quelle ressource(postes,commentaires,etc..)
  app.use('/api/autre', autreRessource);
};
