import http = require('http');
import Server from './server';

let port = 3000;
Server.set('port', port);

let server = http.createServer(Server);
server.listen(port);
server.on('listening', onListening);
function onListening() {
    const addr = server.address();
    console.log(`API REST corriendo en http://localhost:${port}`);
}
