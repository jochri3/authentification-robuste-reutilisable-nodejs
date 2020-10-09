import mongoose from 'mongoose';
import configToUse from '../config/keys';
import logging from '../config/logging';

const { logger } = logging;

//Connexion à la base de données
mongoose
  .connect(configToUse.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connexion à la base de données établie'))
  .catch((error) => logger.info(error));
