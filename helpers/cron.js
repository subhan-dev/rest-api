var schedule = require('node-schedule');

const { pdfcreate } = require('../helpers/pdfcreate');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

module.exports = {
  cronJob: () => {
    schedule.scheduleJob('*/10 * * * * *', async () => {
      const html = fs.readFileSync('./helpers/html-file/data.html', 'utf8');
      const options = { format: 'Letter' };
      data = {name: 'subhan', email: 'subhan@gmail.com'}
      try {
        await pdfcreate(html, data, options, pdf_stream => {
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
        console.log('success cron')
      } catch (error) {
        console.log('error cron')
      }
    });
  }
}