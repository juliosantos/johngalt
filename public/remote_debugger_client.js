//= require jquery.min
//= require JSON.prune
//= require socket.io

$( "script" ).each( function () {
  var match = this.src.match( /(.*)remote_debugger_client/ );
  if (match) { REMOTE_DEBUG_API_URL = match[1]; };
});

window.RemoteDebuggerClient = (function () {
  var log = function (payload, async) {
    var async = typeof async !== "undefined" ? async : true;
    var url = async ? REMOTE_DEBUG_API_URL + "debug_log_async" : REMOTE_DEBUG_API_URL + "debug_log_sync";
    
    $.ajax({
      url : url,
      type : "POST",
      data : JSON.parse( JSON.prune( payload ) ),
      async : false
    });
  };

  var socket = io.connect( REMOTE_DEBUG_API_URL );
  socket.on( "execute", function (debugInfo, callback) {
    var returnValue;

    try {
      returnValue = eval( debugInfo );
    } catch (exception) {
      returnValue = {error : {stack : exception.stack, message : exception.message}};
    }

    if (typeof returnValue === "object") {
      returnValue = JSON.parse( JSON.prune( returnValue ) );
    }

    callback( {returnValue : returnValue} );
  });

  return {
    log : log
  }
}());
