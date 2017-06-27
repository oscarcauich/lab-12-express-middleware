'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

//npm modules
const expect = require('expect');
const superagent = require('superagent');

//app modules
const Restaurant = require('../model/restaurant.js');
const server = require('../lib/server.js');

// const API_URL = process.env.API_URL;
const API_URL =  process.env.API_URL;

describe('testing restaurant router', () => {
  before(server.start);//starts server before tests run
  after(server.stop);//stops server after tests

  describe('testing POST /api/restaurant', () => {
    after(() => Restaurant.remove({}));

    //test data with will be working with
    let data = {
      name: 'Taco Bell',
      address: '1234 Some Street',
      phoneNumber: '123-456-7890',
    };

    it('should respond with a note and 200 status', () => {
      return superagent.post(`${API_URL}/api/restaurant`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.dateAdded).toExist();
          expect(res.body.name).toEqual('Taco Bell');
          expect(res.body.address).toEqual('1234 Some Street');
          expect(res.body.phoneNumber).toEqual('123-456-7890');
        });
    });

    //400 erro on empty body
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/restaurant`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    //this should fail because missing content
    it('should respond with code 400', () => {
      return superagent.post(`${API_URL}/api/restaurant`)
        .send({name: 'test restaurant'})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    //shoul fail because no a name
    it('should respond with 400', () => {
      return superagent.post(`${API_URL}/api/restaurant`)
      .send({address: '848484 test street'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

     //should failed because missing phoneNumber
    it('should respond with 400 code', () => {
      return superagent.post(`${API_URL}/api/restaurant`)
      .send({name: 'test name', address: '144 test street'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

      //should faile because of duplicate record
    it('should respond with 409 code', () => {
      return superagent.post(`${API_URL}/api/restaurant`)
        .send(data)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('testing GET /api/restaurant/:id', () => {
    let tempRestaurant;
    afterEach(() => Restaurant.remove({}));
    beforeEach(() => {
      return new Restaurant({
        name: 'Subway',
        address: '12345 Some Street',
        phoneNumber: '567-123-4567',
      })
      .save()
      .then(restaurant => {
        tempRestaurant = restaurant;
      });
    });
    it('should respond with a restaurant', () => {
      return superagent.get(`${API_URL}/api/restaurant/${tempRestaurant._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });


  });
});


//
//     it('should respond with a note', () => {
//       console.log('tempNote', tempNote)
//       return superagent.get(`${API_URL}/api/notes/${tempNote._id}`)
//       .then(res => {
//         expect(res.status).toEqual(200)
//         expect(res.body._id).toEqual(tempNote._id)
//         expect(res.body.content).toEqual(tempNote.content)
//         expect(res.body.title).toEqual(tempNote.title)
//         expect(new Date(res.body.timestamp)).toEqual(tempNote.timestamp)
//       })
//     })
//   })
//
//   describe('testing PUT /api/notes/:id', () => {
//     afterEach(() => Note.remove({}))
//     beforeEach(() => {
//       return new Note({
//         title: 'hello world',
//         content: 'lsakjf laksjf lkajsdf lkjasflkjasf'
//       })
//       .save()
//       .then(note => {
//         tempNote = note;
//       })
//     })
//
//     it('should respond with a note', () => {
//       console.log('tempNote', tempNote)
//       return superagent.put(`${API_URL}/api/notes/${tempNote._id}`)
//       .send({content: 'hello this is cool'})
//       .then(res => {
//         expect(res.status).toEqual(200)
//         expect(res.body._id).toEqual(tempNote._id)
//         expect(res.body.content).toEqual('hello this is cool')
//         expect(res.body.title).toEqual(tempNote.title)
//         expect(new Date(res.body.timestamp)).toEqual(tempNote.timestamp)
//       })
//     })
//
//     it('should respond with a note', () => {
//       console.log('tempNote', tempNote)
//       return superagent.put(`${API_URL}/api/notes/${tempNote._id}`)
//       .send({content: 'hehe'})
//       .catch(res => {
//         expect(res.status).toEqual(400)
//       })
//     })
//   })
//
//   describe('testing DELETE /api/notes/:id', () => {
//     afterEach(() => Note.remove({}))
//     beforeEach(() => {
//       return new Note({
//         title: 'hello world',
//         content: 'lsakjf laksjf lkajsdf lkjasflkjasf'
//       })
//       .save()
//       .then(note => {
//         tempNote = note;
//       })
//     })
//
//     it('should delete a note', () => {
//       console.log('tempNote', tempNote)
//       return superagent.delete(`${API_URL}/api/notes/${tempNote._id}`)
//       .then(res => {
//         expect(res.status).toEqual(204)
//       })
//     })
//
//     it('bad id should respond with a 404', () => {
//       console.log('tempNote', tempNote)
//       return superagent.delete(`${API_URL}/api/notes/12134`)
//       .catch(res => {
//         expect(res.status).toEqual(404)
//       })
//     })
//     it('bad id should respond with a 404', () => {
//       console.log('tempNote', tempNote)
//       return superagent.delete(`${API_URL}/api/notes/5952a8d5c1b8d566a64ea23f`)
//       .catch(res => {
//         expect(res.status).toEqual(404)
//       })
//     })
//   })
// })
