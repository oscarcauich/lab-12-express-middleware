'use strict';

//npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

//app modules
const Restaurant = require('../model/restaurant.js');

//module logic
const restaurantRouter = module.exports = new Router();

restaurantRouter.post('/api/restaurant', jsonParser, (req, res, next) => {
  console.log('it got hit');

  new Restaurant(req.body)
  .save()
  .then(restaurant => res.json(restaurant))
  .catch(next);
});

// noteRouter.get('/api/notes/:id', (req, res, next) => {
//   console.log('GET /api/notes/:id')
//   Note.findById(req.params.id)
//   .then(note => res.json(note))
//   .catch(next)
// })
//
//
// noteRouter.put('/api/notes/:id', jsonParser, (req, res, next) => {
//   console.log('POST /api/notes/:id');
//
//   let options = {
//     runValidators: true,
//     new: true,
//   }
//
//   Note.findByIdAndUpdate(req.params.id, req.body, options)
//   .then(note => res.json(note))
//   .catch(next)
// })
//
//
// noteRouter.delete('/api/notes/:id', (req, res, next) => {
//   console.log('DELETE /api/notes/:id')
//
//   Note.findByIdAndRemove(req.params.id)
//   .then(() => res.sendStatus(204))
//   .catch(next)
// })
