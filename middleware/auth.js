const jwt = require('jsonwebtoken');

module.exports = {
  isAuth: (req, res, next) => {
    try {
      const token = req.headers.token;
      const decoded = jwt.verify(token, 'secret');
      console.log(decoded)
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        message: 'Token is Invalid'
      });
    }
  },
  isAuthorized: (req,res,next) => {
    console.log(req.user)
    if (req.user.role == 'admin') {
      next();
    } else {
      res.status(401).json({
        message: 'User Not Authorized'
      });
    }
  }
}