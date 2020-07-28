const models = require('../models');
const bcrypt = require('bcrypt');
const Op = models.Sequelize.Op;

const { pdfcreate } = require('../helpers/pdfcreate');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const { v4: uuidv4 } = require('uuid');

const { getPagination, getPagingData } = require('../helpers/pagination');

const { curly } = require('node-libcurl');

module.exports = {
  createUser: async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8) 
    try {
      const user = await models.users.create(req.body);

      res.status(200).json({
        message: `Success Created New User`,
        user
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await models.users.findAll();
      res.status(200).json({
        message: `Get All User`,
        users
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await models.users.findAll({
        where: {id: req.params.id}
      });
      res.status(200).json({
        message: `Get an User with id ${req.params.id}`,
        user
      });
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const result = await models.users.update(req.body, {
        where: {id: req.params.id}
      })
      // console.log(!result[0])
      if(result[0] === 0) {
        res.status(200).json({
          message: `Id not found`,
        });
      } else {
        res.status(200).json({
          message: `Success Updated an User`,
          result
        });
      }
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await models.users.destroy({
        where: {id: req.params.id}
      })
      res.status(200).json({
        message: `Success Delete an User`,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  },
  sendPdf: async (req, res) => {
    const html = fs.readFileSync('./helpers/html-file/data.html', 'utf8');
    const options = { format: 'Letter' };
    try {
      await pdfcreate(html, req.body, options, pdf_stream => {
        const form_data = new FormData();
        form_data.append("pdf", pdf_stream);
        axios({
          method: 'post',
          url: 'http://localhost:2020/upload',
          headers: {
            "Content-Type": `multipart/form-data;boundary=${form_data._boundary}`
          },
          data: form_data
        })
      })
      res.status(200).json({
        message: `Success send pdf`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  },
  getUUID: (req, res) => {
    const uuid = uuidv4();
    res.status(200).json({
      message: `Success create uuid`,
      uuid
    });
  },
  loadData: async (req, res) => {
    const { page, size, name } = req.query;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    
    try {
      const data = await models.users.findAndCountAll({
        where: condition, limit, offset
      })
      console.log(data)
      const response = getPagingData(data, page, limit);
      res.status(200).json({
        message: `Success get load data`,
        response
      });
    } catch (error) {
      res.status(500).send({
        message: error
      });
    }
  },
  curl: async (req, res) => {
    try {
      const { statusCode, data, headers } = await curly.get('api.rajaongkir.com/starter/province', {
        httpHeader: ["key: 48a348231181e42436d71f8c8efdd9b1"]
      })
      // console.log({ statusCode, data, headers })
      const result = JSON.parse(data.toString())
      res.status(200).json({
        message: `Success curl`,
        result: result.rajaongkir
      });
    } catch (error) {
      res.status(500).send({
        message: error
      });
    }
  }
}