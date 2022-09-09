// Importing the express node module:
const express = require('express');

// Using express to create an instance of an app (or server).
const app = express();

// Importing the body-parser node module:
const bodyParser = require('body-parser');

// Create a variable whose value is the port address.
const PORT = process.env.PORT || 5000;

// Tell our server where the static assets live: ** router file if you have them!
const todoRouter = require('./routes/todo.router.js');

// Teach our server how to read JSON:
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/list', todoRouter)

// add code

// Start the server - start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
