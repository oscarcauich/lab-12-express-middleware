'use strict';

// require('dotenv').config();

//npm dependencies
const express = require('express');
const mongoose = require('mongoose');

//this configures mongoose and connect to db
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

let server;

app.use(require('../route/restaurant-router.js'));
app.use(require('./error-handler.js'));

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve, reject) =>{
    if(!server || !server.isOn){
      server = app.listen(process.env.PORT, () => {
        console.log('server is running on port: ', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject();
  });
};

serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    if(server && server.isOn){
      server.close(() => {
        console.log('server is dead');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
