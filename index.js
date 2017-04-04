/**
 * Entry Script
 */
// import the node enviroment
import './env.js';

if (process.env.NODE_ENV === 'production') {
  //require('./server/app_cluster');
  require('./server/index')();
} else {
  require('./server/index')();
}
