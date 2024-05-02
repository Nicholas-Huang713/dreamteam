const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const api = require('./routes/api');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(cors());
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));
app.use(express.json());
// Middleware to parse JSON data
app.use(bodyParser.json());
// Middleware to parse URL-encoded data (if needed)
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI ?
  process.env.MONGODB_URI : 'mongodb://localhost/dream-team', {
  // mongoose.connect('mongodb+srv://nhuang713:patrick123@cluster0.08q7ny7.mongodb.net/?retryWrites=true&w=majority', {
  // mongoose.connect('mongodb://localhost/img-board', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((() => console.log("Connected to DB")))
  .catch(console.error);


app.use('/api', api)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//to redirect for server port
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build")

// if(process.env.NODE_ENV === 'production'){
app.use(express.static(buildPath))
// }

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
})
// // start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});