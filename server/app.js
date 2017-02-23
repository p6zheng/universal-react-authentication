import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import cookie from 'react-cookie';

// Import required modules
import config from './config';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import { AUTH_USER } from '../client/constants/actionTypes';
import Root from '../client/Root';
import './services/auth';

// Initialize express app
const app = express();
const server = http.createServer(app);

// Set port number
app.set('port', process.env.PORT || 3000);

// Wrap each request in domain
app.use((req, res, next) => {
  const domain = require('domain').create();
  domain.on('error',  (err) => {
    console.error('DOMAIN ERROR CAUGHT\n', err.stack);
    try {
      setTimeout(() => {
        console.error('Failsafe shutdown.');
        process.exit(1);
      }, 5000);
      const worker = require('cluster').worker;
      if(worker) worker.disconnect();
      server.close();
      try {
        next(err);
      } catch(err){
        console.error('Express error mechanism failed.\n', err.stack);
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        res.end('Server error.');
      }
    } catch(err){
      console.error('Unable to send 500 response.\n', err.stack);
    }
  });
  domain.add(req);
  domain.add(res);
  domain.run(next);
});

// Run Webpack dev server in development mode
if (app.get('dev') !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webconfig = require('../webpack.config.dev.js');
  app.use(webpackMiddleware(webpack(webconfig), { serverSideRender: true } ));
} else {
  app.use(express.static('../dist'));
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
if (app.get('env') !== 'production') {
  mongoose.connect(config.mongo.devUrl);
} else {
  mongoose.connect(config.mongo.prodUrl);
}
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established!');
});
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Express configuration
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser({type: '*/*'}));

// Setup passport
app.use(passport.initialize());

// Print out worker information
app.use((req,res,next) => {
  const cluster = require('cluster');
  if(cluster.isWorker) console.log(`Worker ${cluster.worker.id} received request`);
  next()
});

// Authentication routes
app.use('/auth', authRouter);
app.use('/api/user', userRouter);

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  delete process.env.BROWSER;
  const store = configureStore();
  cookie.setRawCookie(req.headers.cookie);
  const token = cookie.load('token');
  const userName = cookie.load('user_name');

  if (typeof token !== 'undefined') {
    store.dispatch({
      type: AUTH_USER,
      userName
    });
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
      initialMockup: markup
    });
  }
});


const startServer = () => server.listen(app.get('port'), () => {
  console.log(`App stated in ${app.get('env')} mode on port ${app.get('port')}`);
});


// Start express server
if(require.main === module){
  // application run directly; start app server
  startServer();
} else {
  // application imported as a module via "require": export function
  // to create server
  module.exports = startServer;
}
