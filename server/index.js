import http from 'http';
import app from './app';

const server = http.createServer(app);

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
