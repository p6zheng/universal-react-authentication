import cluster from 'cluster';

const startWorker = () => {
  var worker = cluster.fork();
  console.log('CLUSTER: Worker %d started', worker.id);
};

if(cluster.isMaster){
  require('os').cpus().forEach(function(){
    startWorker();
  });
// log any workers that disconnect; if a worker disconnects, it
// should then exit, so we'll wait for the exit event to spawn
// a new worker to replace it
  cluster.on('disconnect', (worker) => {
    console.log(`CLUSTER: Worker ${worker.id} disconnected from the cluster.`);
  });
// when a worker dies (exits), create a worker to replace it
  cluster.on('exit', (worker, code, signal) => {
    console.log(`CLUSTER: Worker ${worker.id} died with exit code ${code} (${signal})`);
    startWorker();
  });
} else {
// start our app on worker; see meadowlark.js
  require('./index.js')();
}