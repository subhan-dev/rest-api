const pdf = require('html-pdf');
const handlebars = require('handlebars')
// const options = { format: 'Letter' };

module.exports = {
  pdfcreate: (readHTML, data, option, cb) => {
    const replacements = {
      items: data,
      header: 'testing ethis'
    }
    // compiles html file and replaces fields
    const template = handlebars.compile(readHTML);
    const htmlToPdf = template(replacements);
  
    // creates pdf stream from html
    return pdf.create(htmlToPdf, option).toStream((err, stream) => {
      if (err) {
        return console.log(err);
      }
  
      return cb(stream);
    });
  }
}