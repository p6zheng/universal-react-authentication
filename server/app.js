import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import morgan from 'morgan';

// Import required modules
import config from './config';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import { AUTH_USER_SUCCESS, DISPLAY_FLASH_MESSAGE } from '../client/constants/actionTypes';
import Root from '../client/Root';
import './services/passport';
import logger from './logger';


// Initialize express app
const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Set port number
app.set('port', process.env.PORT || 3000);

// Wrap each request in domain
app.use((req, res, next) => {
  const domain = require('domain').create();
  domain.on('error',  (err) => {
    logger.error('DOMAIN ERROR CAUGHT\n', err.stack);
    try {
      setTimeout(() => {
        logger.error('Failsafe shutdown.');
        process.exit(1);
      }, 5000);
      const worker = require('cluster').worker;
      if(worker) worker.disconnect();
      server.close();
      try {
        next(err);
      } catch(err){
        logger.error('Express error mechanism failed.\n', err.stack);
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        res.end('Server error.');
      }
    } catch(err){
      logger.error('Unable to send 500 response.\n', err.stack);
    }
  });
  domain.add(req);
  domain.add(res);
  domain.run(next);
});

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'production') {
  app.set('views', path.resolve(__dirname, '../dist'));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webconfig = require('../webpack.config.dev.js');
  app.use(webpackMiddleware(webpack(webconfig), {
    publicPath: '/',
    serverSideRender: true,
    stats: {
      colors: true,
      chunks: false,
      assets: false,
    }})
  );
}

// React And Redux Setup
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// Connect to mongodb
if(process.env.NODE_ENV !== 'test')mongoose.connect(config.mongo.url);
mongoose.connection.on('connected', () => {
  logger.info('MongoDB connection established!');
});
mongoose.connection.on('error', () => {
  logger.error('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Express configuration
app.set('view engine', 'ejs');
app.use(morgan('combined', { 'stream': logger.stream }));
app.use(express.static(__dirname + '/uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

// Setup passport
app.use(passport.initialize());

// Print out worker information
app.use((req, res, next) => {
  const cluster = require('cluster');
  if (cluster.isWorker) logger.info(`Worker ${cluster.worker.id} received request`);
  next();
});

// Setup Cookie and Session
const MongoStore = require('connect-mongo')(session);
app.use(cookieParser(config.cookie.secret));
app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: config.mongo.url,
    autoReconnect: true
  })
}));

// Authentication routes
app.use('/auth', authRouter);
app.use('/api/user', userRouter);

// Server Side Rendering based on routes matched by React-router
app.use((req, res, next) => {
  delete process.env.BROWSER;
  const token = req.signedCookies.token;
  const userName = req.signedCookies.user_name;
  const userPhoto = req.signedCookies.user_photo;
  const flashMessage = req.session.flashMessage;

  const store = configureStore();

  if (typeof token !== 'undefined') {
    store.dispatch({
      type: AUTH_USER_SUCCESS,
      userName,
      userPhoto
    });
    if (flashMessage) {
      // Clear flashMessage after displaying
      store.dispatch({
        type: DISPLAY_FLASH_MESSAGE,
        flashMessage
      });
      delete req.session.flashMessage;
    }
  }

  const context = {};
  let markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Root />
      </StaticRouter>
    </Provider>
  );


  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else{
    if (context.missed) {
      next();
    }
    res.render('index', {
      initialMockup: markup,
      initialData: {
        token,
        userName,
        userPhoto,
        flashMessage
      }
    });
  }
});

export default app;


