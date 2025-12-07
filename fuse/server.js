const express = require('express');
const router = require('./routing');
const session = require('express-session');
const contextMiddleware = require('./context')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const serveStaticIfExists = require('./serveStatic')
const app = express();
const port = 80;
const multer =  require('multer') ;
const { get_option } = require('../np-includes/options');
const upload = multer();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',            // Change this to a strong secret for your app
  resave: false,                        // Don't save session if unmodified
  saveUninitialized: false,             // Don't create session until something stored
  cookie: { secure: false } ,
  store: new SequelizeStore({
    db: global.npdb,
  }),            // Set to true if using HTTPS
}));

app.use(serveStaticIfExists(global.__app_path));

const multerMiddleWare = (req,res,next) => {
  if(req.query.action != 'upload_file') {
      upload.none()(req,res,next);
  } else {
    next()
  }
 
}

app.all('/{*any}', multerMiddleWare, (req, res) => {
  const NPAdmin = require('../controllers/NPAdmin');
  const NPInstall = require('../controllers/NPInstall');

  const activeTheme = get_option('active_theme');

  global.__active_theme = activeTheme;
  
  if(global.__env.INSTALL_COMPLETE == 'false') {

    NPInstall.registerAJAX();

  } else {
      NPAdmin.ajax();
  }

  const context = {
    req,
    res,
  }
  
  router.execute(context);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost`);
});