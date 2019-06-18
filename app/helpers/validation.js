import Joi from '@hapi/joi';

const contactSchema = Joi.object().keys({
  firstname: Joi.string().min(2).max(20)
    .required(),
  lastname: Joi.string().min(2).max(20),
  email: Joi.string().email(),
  telephone: Joi.string().required(),
  homeAddress: Joi.string().min(2).max(100),
  workAddress: Joi.string().min(2).max(100),
  organisation: Joi.string().min(2).max(100),
});

const EmailOnly = Joi.object().keys({
  email: Joi.string().email(),
});

export default { contactSchema, EmailOnly };
