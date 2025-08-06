const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '12345';

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Missing token');

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'FAIL',
      message: err.message
    });
  }
};