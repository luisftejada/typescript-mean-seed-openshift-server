#!/bin/env node
import { app } from './app';
/**
 * Module dependencies.
 */
let debug = require('debug')('Server');
let http = require('http');

/**
 * Get port from environment and store in Express.
 */


let ipaddress = process.env.OPENSHIFT_NODEJS_IP ||
  process.env.OPENSHIFT_INTERNAL_IP || "undefined" ;

let port = process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.OPENSHIFT_INTERNAL_PORT || 8080;

if (ipaddress === "undefined") {
  //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
  //  allows us to run/test the app locally.
  console.warn('No OPENSHIFT_*_IP var, using 127.0.0.1');
  ipaddress = "127.0.0.1";
}

app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port,ipaddress);

server.on('error', onError);
server.on('listening', onListening);



/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  let ip = ipaddress || 'http://localhost';
  console.log(`Listening on ${ip}:${port}`);
  debug('Listening on ' + bind);
}
