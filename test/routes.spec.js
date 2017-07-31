process.env.NODE_ENV = 'test';
const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');

const should = chai.should();

chai.use(chaiHttp);

const arrayContains = ((response, key, value) => {
  const answerArray = [];
  response.body.forEach((dataPoint) => {
    answerArray.push(dataPoint[key] === value);
  });
  return answerArray;
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done());
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => done());
  });

  describe('GET inventory request', () => {
    it('should return inventory if user hits inventory api endpoint', (done) => {
      chai.request(server)
      .get('/api/v1/inventory')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(9);
        arrayContains(response, 'title', 'tz').should.include(true);
        arrayContains(response, 'description', 'pinball').should.include(true);
        arrayContains(response, 'image', 'http://download.gamezone.com/uploads/image/data/1105285/twilightzonepinball.jpg').should.include(true);
        arrayContains(response, 'price', '5000.00').should.include(true);
        arrayContains(response, 'title', 'hot pocket').should.include(true);
        arrayContains(response, 'description', 'yummy').should.include(true);
        arrayContains(response, 'image', 'https://www.hotpockets.com/media/1006/hp_steam.jpg').should.include(true);
        arrayContains(response, 'price', '5.99').should.include(true);
        arrayContains(response, 'title', 'unicorn').should.include(true);
        arrayContains(response, 'description', 'mythical creature').should.include(true);
        arrayContains(response, 'image', 'https://s-media-cache-ak0.pinimg.com/736x/3b/06/ef/3b06efe25fed62de2960090ff2b8d83a--cute-cartoon-drawings-drawings-of.jpg').should.include(true);
        arrayContains(response, 'price', '333.00').should.include(true);

        done();
      });
    });
    it('should return a 404 and helpful error message if no inventory is found', (done) => {
      database.migrate.rollback()
      .then(() => database.migrate.latest())
      .then(() => {
        chai.request(server)
        .get('/api/v1/inventory')
        .end((err, response) => {
          response.should.have.status(404);
          response.error.text.should.equal('Inventory was not found');
          done();
        });
      });
    });
  })

  describe('GET order_history request', () => {
    it('should return order_history if user hits order_history api endpoint', (done) => {
      chai.request(server)
      .get('/api/v1/order_history')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(5);
        arrayContains(response, 'date', '20170727').should.include(true);
        arrayContains(response, 'date', '20170720').should.include(true);
        arrayContains(response, 'date', '20170728').should.include(true);
        arrayContains(response, 'date', '20170731').should.include(true);
        arrayContains(response, 'total', '338').should.include(true);
        arrayContains(response, 'total', '55555').should.include(true);
        arrayContains(response, 'total', '802822').should.include(true);
        arrayContains(response, 'total', '103992').should.include(true);
        arrayContains(response, 'total', '93736262').should.include(true);
        done();
      });
    });
    it('should return a 404 and helpful error message if no order history is found', (done) => {
      database.migrate.rollback()
      .then(() => database.migrate.latest())
      .then(() => {
        chai.request(server)
        .get('/api/v1/order_history')
        .end((err, response) => {
          response.should.have.status(404);
          response.error.text.should.equal('Order history not found');
          done();
        });
      });
    });
  });

  describe('POST order_history request', () => {
    it('should insert new order history into database if hits enpoint', (done) => {
      chai.request(server)
      .post('/api/v1/order_history')
      .send({ date: '02132133',
        total: '999'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.text.should.equal('order recorded in table');
        response.request._data.should.have.property('date');
        response.request._data.date.should.equal('02132133');
        response.request._data.should.have.property('total');
        response.request._data.total.should.equal('999');
        done();
      });
    })
  })
})
