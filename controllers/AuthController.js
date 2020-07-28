const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    try {
      const user = await models.users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
      })
      res.status(200).json({
        message: "Success Sign Up",
        user
      })
    } catch (error) {
      res.status(500).json({
        message: error
      })
    }
  },
  signIn: async (req, res) => {
    try {
      const user = await models.users.findOne({
        where: {
          email: req.body.email
        }
      })
      const checkLogin = bcrypt.compareSync(req.body.password,user.password);
      if(!user || !checkLogin) {
        res.status(500).json({
          message: "Failed Sign In"
        })
      } else {
        var token = jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '1h' });
        console.log(token)
        if(token) {
          res.status(200).json({
            message: "Success Sign In",
            token: token,
          })
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed Sign In"
      })
    }
  }
}