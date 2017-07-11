'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _middleware = require('./app/middleware');

var Middleware = _interopRequireWildcard(_middleware);

var _routes = require('./app/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 4000;
var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev')); // log every request to the console

app.use(_bodyParser2.default.json()); // pull information from html in POST
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

app.use((0, _cors2.default)()); // allow cross-origin requests

// middleware
app.all('/*', Middleware.SampleMiddleware);

// application routes
(0, _routes2.default)(app);

// index route
app.get('/', function (req, res) {
  return res.status(200).set({ 'content-type': 'text/html; charset=utf-8' }).send('Welcome!');
});

// catch-all route
app.get('/*', function (req, res) {
  if (!res.headersSent) {
    return res.status(404).set({ 'content-type': 'text/html; charset=utf-8' }).send('Not found');
  }
});

var server = app.listen(port, function () {
  console.log('Listening at http://%s:%s', server.address().address, server.address().port);
});