/// <reference path="../typings/index.d.ts" />

"use strict";

//npm modoules
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as serve_static from "serve-static";

var projectdir = path.join(__dirname,'../');
var app = express();
var port = 3002;  //listening port

//middleware
app.use(favicon(path.join(projectdir, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serve_static(path.join(projectdir, 'public')));

//routes - api endpoints
app.get('/', function(req, res){res.send('default route')});
app.get('SingleTable/:index1/:index2');  //get range of table entries
app.get('SingleTable/:id');  //get specific table entry
app.get('SingleTable');  //get all table entries
app.post('SingleTable') ; //add new table entry
app.put('SingleTable/:id'); //update specific table entry
app.delete('SingleTable/:id'); //delete specific table entry

interface ErrorWithStatus extends Error {status : number};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err:any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err:ErrorWithStatus, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err:ErrorWithStatus, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

if (!module.parent) {
  app.listen(port, function () {
    console.log("Express server listening on port %d",port);
  });

};

module.exports = app;
