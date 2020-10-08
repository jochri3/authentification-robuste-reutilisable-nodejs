// Main starting point of the application
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';
import errors from './middlewares/errors';
import 'express-async-errors';

// Configuration de la base de données
mongoose
  .connect('mongodb://localhost:27017/auth', { useNewUrlParser: true })
  .then(() => console.log('Connexion à la base de données établie'))
  .catch((error) => console.log(error));

const app = express();

app.use(morgan('combined')); //framawork pour des logs
app.use(bodyParser.json({ type: '*/*' }));
app.use(errors);

router(app);

// Configuration du serveur
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () =>
  console.log('Le serveur écoute sur le port : ', port)
);
