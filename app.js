// Main starting point of the application
import express from 'express';
import http from 'http';
import logging from './config/logging';
import routes from './startup/api.routes';
import './startup/db';

const { logger, logExceptions } = logging;

import 'express-async-errors';

const app = express();
routes(app, logger);
logExceptions();

// Configuration du serveur
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => {
  logger.info(
    `Le serveur d\'authentification écoute sur http://localhost:${port}`
  );
});
