# John Galt

A node.js remote debugging server.

> The fourth, who was the youngest, had looked at her silently for a moment and the lines of his face had slithered from blankness into a suggestion of contempt. “You know, Miss Taggart, I don't think that such a motor should ever be made, even if somebody did learn how to make it. It would be so superior to anything we've got that it would be unfair to lesser scientists, because it would leave no field for their achievements and abilities. I don't think that the strong should have the right to wound the self esteem of the weak.” She had ordered him out of her office, and had sat in incredulous horror before the fact that the most vicious statement she had ever heard had been uttered in a tone of moral righteousness.

—Ayn Rand, «Atlas Shrugged»

## Installation

### Running the server

`node server.js`

#### Note for Heroku deployments
If you want to deploy this to Heroku, you'll need to run `heroku labs:enable websockets`.

Check out https://devcenter.heroku.com/articles/node-websockets for more information.

### Including the client library
You will need to include the remote debugging client library on the page you want to debug with:
```html
<script data-main="http://localhost:5000/remote_debugger_client" src="http://localhost:5000/require.js"></script>
```
Replace `http://localhost:5000` with your server URL.

## Admin interface

The admin interface will be available at the server root. That will be http://localhost:5000/, or wherever else you have it running.

### Monitor remote logs

They will be displayed in the *Monitor* tab. You'll also find them in the console and under `window.debugInfo`.

### Execute code remotely

Jump to the *Execute* tab, throw your code in the box and press the *Execute* button. The result will be displayed in the console and under `window.executionInfo`.

## Logging

Remote logging from the application to debug is done as follows:
```js
RemoteDebuggerClient.log( {foo : bar} )
```
If you pass `true` as a second parameter, the log will block execution until it's released on the Admin interface.
```js
RemoteDebuggerClient.log( {foo : bar}, true )
```

