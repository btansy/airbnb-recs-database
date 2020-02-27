const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const port = 3003;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require ('./db.js');

var cors = require('cors');
app.use(cors());

app.get('/pageload', (req, res) => {
  db.pageload( req.query.listid, req.query.userid, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data.rows);
    }
  })
});

app.put('/recommendations', (req, res) => {
  console.log('POSTGRES PUT RECIEVED');
  db.createRec( req.query.primary, req.query.secondary, (err, data) => {
    if (err) {
      console.log('POSTGRES PUT FAIL');
      res.status(400).send(err);
    } else {
      console.log('POSTGRES PUT SUCCESS');
      res.status(200).send(data.rows);
    }
  })
});

app.listen(port, () => console.log(`App listening on port ${port}`));