require(["jquery.min","JSON.prune","socket.io/socket.io"], function() {
  window.RemoteDebuggerClient = (function () {
    var API_URL = require.toUrl( "" );

    var log = function (payload, async) {
      var async = typeof async !== "undefined" ? async : true;
      var url = async ? API_URL + "debug_log_async" : API_URL + "debug_log_sync";
      
      $.ajax({
        url : url,
        type : "POST",
        data : JSON.prune( payload ),
        contentType: "application/json; charset=utf-8",
        processData : false,
        async : false
      });
    };

    var socket = io.connect( API_URL );
    socket.on( "execute", function (debugInfo, callback) {
      try {
        var returnValue = eval( debugInfo );
      } catch (exception) {
        var returnValue = exception;
      }

      callback( {returnValue : returnValue} );
    });

    return {
      log : log
    }
  }());
});

