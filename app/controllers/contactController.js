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

  static async updateContact(req, res){
          if (!req.body.firstname || !req.body.lastname || !req.body.telephone || !req.body.email || !req.body.homeAddress || !req.body.workAddress || !req.body.organisation) {
              res.status(403).end();
              return res.status(403).send({
                message: "fields can not be empty"
              });
          }
          Contact.findByIdAndUpdate(req.params.id, {
            firstname: req.body.firstname || contact.firstname,
            lastname: req.body.lastname || contact.lastname,
            telephone: req.body.telephone || contact.telephone,
            email: req.body.email || contact.email,
            homeAddress: req.body.homeAddress || contact.homeAddress,
            workAddress: req.body.workAddress || contact.workAddress,
            organisation: req.body.organisation || contact.organisation,
          }, {new: true})
          .then(contact => {
            if(!contact){
              return res.status(404).send({
                  message: "Contact not found with id " + req.params.id
              });
            }
            return res.status(200).json({
              message: 'Contact Updated',
              status: res.statusCode,
              data: contact,
            });
          }).catch(err => {
            if(err.kind === 'ObjectId') {
                  return res.status(404).send({
                      message: "Contact not found with id " + req.params.id
                  });                
                }
                return res.status(500).send({
                    message: "Error updating contact with id " + req.params.id
                });
          });
        }

  static async deleteContact(req, res) {
    try {
      const { id } = req.params;
      if (mongoose.Types.ObjectId.isValid(id)) {
        Contact.findOneAndRemove({ _id: id })
          .then((docs) => {
            if (docs) {
              res.status(200).json({
                status: 200,
                id: req.params.id,
                message: 'Contact Deleted successfully!',
              });
            } else {
              res.status(404).json({
                status: 404,
                id: req.params.id,
                message: 'This id is not Exist!',
              });
            }
          }).catch((err) => {
            console.log(err);
          });
      } else {
        return res.status(400).json({
          status: 400,
          message: 'please provide correct Id',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${error}`,
      });
    }
  }
  /**
   * @function viewAll
   * @param {Object} res
   * @returns {Object}
   */

  static async viewAll(_req, res) {
    try {
      const findAll = await Contact.find({}).select(['-__v']).exec();
      if (findAll) {
        return res.status(200).json({ status: 200, data: findAll });
      }
      return res.status(404).json({ status: 404, error: 'no content found' });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${err}`,
      });
    }
  }

  /**
   * @function viewById
   * @param {Object} req
   * @param {Object} res
   * @returns {Object}
   */

  static async viewById(req, res) {
    try {
      const findId = await Contact.findById({ _id: req.params.id })
        .select(['-__v'])
        .exec();

      if (findId) {
        return res.status(200).json({ status: 200, data: findId });
      }
      return res.status(404).json({ status: 404, error: 'no content found' });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${err}`,
      });
    }
  }

  /**
   * @function viewByEmail
   * @param {Object} req
   * @param {Object} res
   * @returns {Object}
   */
  static async viewByEmail(req, res) {
    const { email } = req.body;
    const { error } = Joi.validate({ email }, validatation.EmailOnly);
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

    try {
      const findEmail = await Contact.findOne({ email })
        .select(['-__v'])
        .exec();

      if (findEmail) {
        return res.status(200).json({ status: 200, data: findEmail });
      }
      return res.status(404).json({ status: 404, error: 'no content found' });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${err}`,
      });
    }
  }

  /**
   * @function viewByName
   * @param {Object} req
   * @param {Object} res
   * @returns {Object}
   */
  static async viewByName(req, res) {
    const { name } = req.body;
    const terms = name.split(' ');
    let regexString = '';
    for (let i = 0; i < terms.length; i += 1) {
      regexString += terms[i];
      if (i < terms.length - 1) regexString += '|';
    }
    const re = new RegExp(regexString, 'ig');

    try {
      const findByName = await Contact.find({})
        .or([{ firstname: re }, { lastname: re }])
        .select(['-__v'])
        .exec();

      if (findByName.length > 0) {
        return res.status(200).json({ status: 200, data: findByName });
      }
      return res.status(404).json({ status: 404, error: 'no content found' });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${err}`,
      });
    }
  }
}

export default contactController;