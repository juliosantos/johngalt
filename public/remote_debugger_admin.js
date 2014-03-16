$( document ).ready( function () {
  io.connect().on( "debug:info", function (debugInfo) {
    $( "#debug-release" ).prop( "disabled", debugInfo.async );

    $( "#debug-info" ).html( JSON.stringify( debugInfo.contents , null, 4 ) );

    console.log( "DEBUGGER INFO (window.debugInfo):" );
    console.log( debugInfo.contents );
    console.log( "*** end ***" );

    window.debugInfo = debugInfo.contents;
  });

  $( "#debug-release" ).click( function (event) {
    $.post( "/debug_release", function () {
      $( event.target ).prop( "disabled", true );
    });
  });

  $( "#debug-execute" ).click( function (event) {
    $( event.target ).button( "executing" );
    var command = $( "textarea" ).val();
    $.post( "/debug_execute", {command : command}, function (response) {
      console.log( "EXECUTION INFO (window.executionInfo):" );
      console.log( response );
      console.log( "*** end ***" );

      $( event.target ).button( "reset" );
      window.executionInfo = response;
    });
  });
});

