const jwt = require('jsonwebtoken');
const { JWT_SECRET_DEV } = require('../const/const');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET_PROD } = process.env;

let payload;

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new UnauthorizedError('Log in to access');
  }

  const token = auth.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET_DEV);
  } catch (err) {
    throw new UnauthorizedError('Log in to access');
  }

  req.user = payload;
  next();
};

module.exports = { isAuthorized };
