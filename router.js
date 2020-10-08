import Authentication from './controllers/authentication';
import passeportService from './services/passport';
import passeport from 'passport';

// {session:false} => If user is authenticated, don't create a session
// Because by default passeport wanna try to make a cookie-session based authentication
const requireAuth = passeport.authenticate('jwt', { session: false });
const requireSigin = passeport.authenticate('local', { session: false });

export default function (app) {
  // Middleware
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSigin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
