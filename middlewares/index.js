const jwt = require('jsonwebtoken');

module.exports = {
  verifyTokenUser: (req, res, next) => {
    if (!req.headers.authorization) res.status(401).json({ message: 'Not authorized.' });
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) res.status(401).json({ message: 'Not authorized.' });
      req.decoded = decoded;
      next();
    });
  },
  verifyTokenAdmin: (req, res, next) => {
    if (!req.headers.authorization) res.status(401).json({ message: 'Not authorized.' });
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) res.status(401).json({ message: 'Not authorized.' });
      if (decoded.admin === false) res.status(401).json({ message: 'Not authorized.' });
      req.decoded = decoded;
      next();
    });
  },
};
