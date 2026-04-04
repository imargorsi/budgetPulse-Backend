const jwt = require('jsonwebtoken');
const AppError = require('../helper/AppError');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  // Expect: Bearer TOKEN
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('You are not authorized', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
};