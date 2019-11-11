"use strict";
exports.__esModule = true;
var http = require("http");
var server_1 = require("./server");
var port = 3000;
server_1["default"].set('port', port);
var server = http.createServer(server_1["default"]);
server.listen(port);
server.on('listening', onListening);
function onListening() {
    var addr = server.address();
    console.log("API REST corriendo en http://localhost:" + port);
}
