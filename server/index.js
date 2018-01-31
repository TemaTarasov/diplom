import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import session from 'express-session';
import serverConfig from './config/server.json';

import mongoose from 'mongoose';
import mongoConfig from './config/mongo.json';

import tokenConfig from './config/token.json';

mongoose.connect(`mongodb://127.0.0.1:${mongoConfig.port}/${mongoConfig.db}`, {
  useMongoClient: true
});

/**
 * Routes
 */
import mainRoute from './routes';

/**
 * Api routes
 */
import userRoute from './routes/Api/v1/users';

const app = express();

app.use(session({
  secret: serverConfig.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: serverConfig.session.cookie}
}));

session[tokenConfig.header] = {
  user: {
    id: null,
    login: null,
    permissions: null
  },
  token: null
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

/**
 * Api routers
 */
app.use('/api/v1/users', userRoute);

/**
 * Basic route
 */
app.use('*', mainRoute);

export default app;
