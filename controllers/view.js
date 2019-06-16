import Contact from '../models/contacts.model';

/**
 * @function handleError
 * @param {Error} err
 */

const handleError = (err) => {
  console.error(err);
};

/**
 * @function returnHelper
 * @param {Error} err
 * @param {Object} res
 * @param {Object} contact
 * @returns {Object}
 */

export const returnHelper = (err, res, contact) => {
  if (err) return handleError(err);
  if (contact) {
    return res.status(200).json({ status: 200, data: contact });
  }
  return res.status(404).json({ status: 404, error: 'no content found' });
};

/**
 * @function viewAll
 * @param {Object} res
 * @returns {Object}
 */

export const viewAll = (_req, res) => {
  Contact.find({})
    .select(['-__v'])
    .exec((err, contact) => {
      returnHelper(err, res, contact);
    });
};

/**
 * @function viewById
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */

export const viewById = (req, res) => {
  Contact.findById({ _id: req.params.id })
    .select(['-__v'])
    .exec((err, contact) => {
      returnHelper(err, res, contact);
    });
};

/**
 * @function viewByEmail
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const viewByEmail = (req, res) => {
  const { email } = req.body;
  Contact.findOne({ email })
    .select(['-__v'])
    .exec((err, contact) => {
      returnHelper(err, res, contact);
    });
};

/**
 * @function viewByName
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const viewByName = (req, res) => {
  const { name } = req.body;
  const terms = name.split(' ');
  let regexString = '';
  for (let i = 0; i < terms.length; i += 1) {
    regexString += terms[i];
    if (i < terms.length - 1) regexString += '|';
  }
  const re = new RegExp(regexString, 'ig');

  Contact.find({})
    .or([{ firstName: re }, { lastName: re }])
    .select(['-__v'])
    .exec((err, contact) => {
      returnHelper(err, res, contact);
    });
};

