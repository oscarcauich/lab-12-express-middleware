'use strict';

//npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

//app modules
const Restaurant = require('../model/restaurant.js');

//module logic
const restaurantRouter = module.exports = new Router();

//POST router
restaurantRouter.post('/api/restaurant', jsonParser, (req, res, next) => {

  new Restaurant(req.body)
  .save()
  .then(restaurant => res.json(restaurant))
  .catch(next);
});

//GET Router
restaurantRouter.get('/api/restaurant/:id', (req, res, next) => {
  Restaurant.findById(req.params.id)
  .then(restaurant => res.json(restaurant))
  .catch(next);
});

restaurantRouter.put('/api/restaurant/:id', jsonParser, (req, res, next) => {
  console.log('PUT /api/notes/:id');
  let options = {
    runValidators: true,
    new: true,
  };
  Restaurant.findByIdAndUpdate(req.params.id, req.body, options)
  .then(restaurant => res.json(restaurant))
  .catch(next);
});

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
