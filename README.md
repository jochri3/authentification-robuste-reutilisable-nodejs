## Authentification robuste et réutilisable

Cet projet implemente un système d'authentification robuste et fiable que vous pouvez réutiliser dans n'importe quel projet<br />
Le mecanisme d'authentification utilisé est basé sur des strategy `passport` qui est très flexible et qui peut être utilisé avec n'importe quelle autre strategie d'authentification telles que `Oauth2` , `jwt` , `cookies-session`, etc..<br>
Dans le cas de ce projet, l'authentification utilisé est celle du standard `jsonwebtoken` combiné avec une autre stratégie local.
Avec le code existant vous pouvez très facilement ajouter des stratégies basées sur Oauth2(Google, Facebook, Githhub, Google,etc..)

## Comment faire fonctionner ce projet?

Dans votre terminal, positionnez-vous dans le dossier principal du projet et exécutez la commande :<br />
`git clone https://github.com/jochri3/authentification-robuste-reutilisable-nodejs.git` pour cloner le projet dans votre système

##Installer tous les dépendance avec :
`yarn` ou `npm install` selon que vous utilisez `yarn` ou `npm`

## Démarrer le projet avec :

`yarn start`

##Pour ouvrir l'application en développement.<br />
Ouvrir [http://localhost:3000](http://localhost:3000) pour le voir dans le navigateur.

##Comment utiliser cette API?

L'API possède 3 routes:

<ul>
<li>`GET /api/autre` : Route de test protégé par un middleware nommé `requireAuth` qui protège l'accès à la ressource.</li>
<li>`POST /api/auth/sigin` qui recois de `req.body` des donnée en `json` en avec comme squelette `{email:'jojo@gmail.com',password:'mot de passe'}`.Si l'authentification se passe bien, cette route retourne un `JSON WEB TOKEN`.<br>Ce `token` vous pouvez l'ajouter comme valeur dans le header `authorization` et tester la route `GET /api/autre`</li>
<li>`POST /api/auth/signup` qui recois `{email:'jojo@gmail.com',password:'mot de passe'}` pour créer un nouvel utilisateur et après sa création elle retourne un `JSON WEB TOKEN`</li>
</ul>

##Logs
Ce projet possède des logs qui sont une très bonne pratique dans le développement d'une API et vous permet d'avoir des informations telles que des rapports de bugs par exemple.Pour cela les libraries utilisées sont `winston` et `morgan` combinées.

Si vous avez des questions, n'hesitez pas de m'écrire sur `jochri3@gmail.com`
