import Joi from '@hapi/joi';
import dummy from './dummy';
import validation from '../app/helpers/validation';

describe('validation', () => {
  it('should validate the req body successfully', (done) => {
    const result = Joi.validate(dummy.newContact, validation.contactSchema);
    result.should.be.an('Object');
    result.should.have.property('error').to.be.equal(null);
    result.should.have.property('value').to.be.an('Object');
    done();
  });


  it('should validate the req body successfully', (done) => {
    const result = Joi.validate(dummy.falseContact, validation.contactSchema);
    result.should.be.an('Object');
    result.error.should.have.property('name').to.be.equal('ValidationError');
    done();
  });
});
