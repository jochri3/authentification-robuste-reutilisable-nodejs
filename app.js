// Main starting point of the application
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';

// Configuration de la base de données
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });

const app = express();
// App setup
app.use(morgan('combined')); //logging framwork
app.use(bodyParser.json({ type: '*/*' }));

router(app);

// Configuration du serveur
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () =>
  console.log('Le serveur écoute sur le port : ', port)
);
