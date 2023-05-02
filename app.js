const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./config/main');
const profiler = require('./middlewares/Profiler');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.session));

// app.use(profiler); // profiler middleware 

// using ejs as view engine
app.set('views', __dirname + '/application/views');
app.set('view engine', 'ejs');

// include router
app.use('/', require('./config/routes'));

// starting server
app.listen(config.port, function () {
	console.log("server listening on port " + config.port);
})