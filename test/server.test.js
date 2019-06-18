import http from 'http';
import { assert } from 'chai';

describe('Express Server', () => {
  it('should return 200', (done) => {
    http.get('http://localhost:3000/contacts/all', (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('Should not route', () => {
  it('should return 400', (done) => {
    http.get('http://localhost:3000/all', (res) => {
      assert.equal(400, res.statusCode);
      done();
    });
  });
});
