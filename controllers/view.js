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
};import Contact from '../models/contacts.model';

/**
 * @function handleError
 * @param {Error} err
 */

const handleError = (err) => {
  console.error(err);
};
