const jwt = require('jsonwebtoken');
const AppError = require('../helper/AppError');
const { db } = require('../models');

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  // Expect: Bearer TOKEN
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('You are not authorized', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists. Please login again.', 401));
    }

    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
};