const request = require('supertest');

const app = require('./app');

describe('GET /', () => {
  it('should respond with message', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('404', () => {
  it('should respond with message - Not found', async () => {
    const path = '/non-existing-url';

    const res = await request(app)
      .get(path)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(res.body.message).toEqual(`${path} was not found!`);
  });
});
