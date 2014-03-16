var express = require( "express" );
var cors = require( "cors" );
require( "events" ).EventEmitter;

var app = express();
app.use( cors() );
app.use( express.urlencoded() );
app.use( express.json() );
app.use( express.static( __dirname + '/public' ) );

app.get( "/", function (request, response) {
  response.sendfile( "public/index.html" );
});

app.post( "/debug_log_async", function(request, response) {
  server.emit( "debug:log", {contents : request.body, async : true} );
  response.send();
});

app.post( "/debug_log_sync", function(request, response) {
  server.emit( "debug:log", {contents : request.body, async : false} );
  server.once( "debug:release", function () {
    response.send();
  });
});

app.post( "/debug_release", function (request, response) {
  server.emit( "debug:release" );
  response.send();
});

app.post( "/debug_execute", function(request, response) {
  server.emit( "execute", request.body.command, function (executionInfo) {
    response.send( executionInfo );
  });
});

var server = app.listen( process.env.PORT || 5000 );

var io = require( "socket.io" ).listen( server, {log : false} );

io.sockets.on( "connection", function (socket) {
  server.on( "debug:log", function (debugInfo) {
    socket.emit( "debug:info", debugInfo );
  });
  server.on( "execute", function (executionInfo, callback) {
    socket.emit( "execute", executionInfo, callback );
  });
});

