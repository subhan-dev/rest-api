const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const users = require('./routes/users');

const { cronJob } = require('./helpers/cron');

const app = express();

const port = process.env.PORT || 3000;

//body parser
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res
    .status(200)
    .send(`Welcome to API`);
});

app.use('/', users);

//cronJob send pdf to thirdparty every 10 second
// cronJob();

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});