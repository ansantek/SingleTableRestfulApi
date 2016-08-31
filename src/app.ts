/// <reference path="../typings/index.d.ts" />

"use strict";

//npm modoules
import * as express from "express";
import * as path from "path";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";

import * as singleTableModel from './models/SingleTableModel';

var projectdir = path.join(__dirname,'../');
var app = express();
var port = 3002;  //listening port

// view engine setup
app.set('views', path.join(projectdir, 'views'));
app.set('view engine', 'jade');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes - api endpoints
app.get('/SingleTable/:offset/:limit', singleTableModel.getSingleTableRange);  //get range of table entries
app.get('/SingleTable/:id',singleTableModel.getSingleTableId);  //get specific table entry
app.get('/SingleTable', singleTableModel.getSingleTableList);  //get all table entries
app.post('/SingleTable',singleTableModel.addSingleTableEntry) ; //add new table entry
app.put('/SingleTable/:id',singleTableModel.updateSingleTableEntry); //update specific table entry
app.delete('/SingleTable/:id',singleTableModel.deleteSingleTableEntry); //delete specific table entry

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
