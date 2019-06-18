
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('App Should add a contact', () => {
  it('should a contact', (done) => {
    chai.request(app).post('/contacts/add')
      .send({
        telephone: '2569020202',
        firstname: 'Martin Luther',
      })
      .end((error, res) => {
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
