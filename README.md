## Authentification robuste et réutilisable

Cet projet implémente un système d'authentification robuste et fiable que vous pouvez réutiliser dans n'importe quel projet<br />
Le mécanisme d'authentification utilisé est basé sur des stratégies `passport` qui est très flexible et qui peut être utilisé avec n'importe quelle autre stratégie d'authentification telles que `Oauth2` , `jwt` , `cookies-session`, etc..<br>
Dans le cas de ce projet, l'authentification utilisé est celle du standard `jsonwebtoken` combiné avec une autre stratégie locale.
Avec le code existant vous pouvez très facilement ajouter des stratégies basées sur Oauth2(Google, Facebook, Githhub, Google,etc..)

Dans ce projet, le SGBD utilisé est `MongoDB`, mais vous pouvez le remplacer par n'importe quel système de stockage `nosql` ou `relationnel` comme `MySQL`, `MariaDB` ou encore `PostreSQL` car toutes les fonctionnalités de importantes sont indépendantes du système de stockage utilisé.

## Comment faire fonctionner ce projet?

- Avoir `node.js` installé avec `npm` ou `yarn`
- Avoir `Mongodb` installé en local ou une base de données sur le cloud

Dans votre terminal, positionnez-vous dans le dossier principal du projet et exécutez la commande :<br />
`git clone https://github.com/jochri3/authentification-robuste-reutilisable-nodejs.git` pour cloner le projet dans votre système

## Installer tous les dépendance avec :

`yarn` ou `npm install` selon que vous utilisez `yarn` ou `npm`

## Démarrer le projet avec :

`yarn dev`

## Pour ouvrir l'application en développement.<br />

Ouvrir [http://localhost:3090](http://localhost:3090) pour le voir dans le navigateur.

## Comment utiliser cette API?

L'API possède 3 routes:

```js
import router from '../router';
const { authRouter, autreRessource } = router;

app.use('/api/auth', authRouter);
app.use('/api/autre', autreRessource);
```

```js
authRouter.post('/signin', requireSignin, Authentication.signin);
authRouter.post('/signup', Authentication.signup);
autreRessource.get('/', requireAuth, (req, res) => {
  res.send({
    message: 'Voici comment proteger une route par authentification',
  });
});

export default {
  authRouter,
  autreRessource,
};
```

- `GET` `/api/autre` : Route de test protégé par un middleware nommé `requireAuth` qui protège l'accès à la ressource.
- `POST /api/auth/sigin` qui recois de `req.body` des donnée en `json` en avec comme squelette `{email:'jojo@gmail.com',password:'mot de passe'}`.Si l'authentification se passe bien, cette route retourne un `JSON WEB TOKEN`.<br>Ce `token` vous pouvez l'ajouter comme valeur dans le header `authorization` et tester la route `GET /api/autre`.
- `POST /api/auth/signup` qui recois `{email:'jojo@gmail.com',password:'mot de passe'}` pour créer un nouvel utilisateur et après sa création elle retourne un `JSON WEB TOKEN`

![Signup route](https://res.cloudinary.com/jochri3/image/upload/v1602252554/github/Screenshot_2020-10-09_150856.png)

![Signin route](https://res.cloudinary.com/jochri3/image/upload/v1602252654/github/Screenshot_2020-10-09_151118.png)

![Route protégée](https://res.cloudinary.com/jochri3/image/upload/v1602252705/github/Screenshot_2020-10-09_151216.png)

## Logs

Ce projet possède des logs qui sont une très bonne pratique dans le développement d'une API et vous permet d'avoir des informations telles que des rapports de bugs par exemple.Pour cela les libraries utilisées sont `winston` et `morgan` combinées.

Si vous avez des questions, n'hesitez pas de m'écrire sur `christian.lisangola@gmail.com`

## Ressources importantes

- [Passeport.js](http://www.passportjs.org/)
- [Json web token](https://jwt.io/)
- [Morgan](https://github.com/expressjs/morgan)
- [Winston](https://github.com/winstonjs/winston)
