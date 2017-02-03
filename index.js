/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  require('./server/app_cluster');
} else {
  require('./server/app');
}
