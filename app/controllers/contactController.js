import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import Contact from '../models/models';
import validatation from '../helpers/validation';

class contactController {
  static async createContact(req, res) {
    try {
      const {
        firstname, lastname, telephone, email, homeAddress, workAddress, organisation,
      } = req.body;
      const { error } = Joi.validate(req.body, validatation.contactSchema);
      if (error) {
        const errors = [];
        for (let index = 0; index < error.details.length; index += 1) {
          errors.push(error.details[index].message.split('"').join(''));
        }
        return res.status(400).send({
          status: res.statusCode,
          error: errors,
        });
      }
      const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        firstname,
        lastname,
        telephone,
        email,
        homeAddress,
        workAddress,
        organisation,
      });
      const result = await contact.save();
      return res.status(201).json({
        message: 'Success',
        status: res.statusCode,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${err}`,
      });
    }
  }
}

export default contactController;
