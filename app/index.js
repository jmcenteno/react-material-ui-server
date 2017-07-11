'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from  'cors';

import * as Middleware from './middleware';
import Router from './routes';

const port = process.env.PORT || 4000;
const app = express();

app.use(morgan('dev')); // log every request to the console

app.use(bodyParser.json()); // pull information from html in POST
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors()); // allow cross-origin requests

// middleware
app.all('/*', Middleware.SampleMiddleware);

// application routes
Router(app);

// index route
app.get('/', function(req, res) {
  return res
    .status(200)
    .set({ 'content-type': 'text/html; charset=utf-8' })
    .send('Welcome!');
});

// catch-all route
app.get('/*', function(req, res) {
  if (!res.headersSent) {
    return res
      .status(404)
      .set({ 'content-type': 'text/html; charset=utf-8' })
      .send('Not found');
  }
});

const server = app.listen(port, function() {
  console.log(
    'Listening at http://%s:%s', 
    server.address().address, 
    server.address().port
  );
});
