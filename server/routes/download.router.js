const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
let debug = true; // toggle for console.log

if(debug){console.log('in download.router')};

router.get('/', (request, response) => {
  console.log('in get all');
  pool.query('SELECT * FROM csv_spike_table ORDER BY id;')
  .then((result) => {
    console.log('success in get', result);
    response.send(result);
  })
  .catch((err) => {
    console.log('error in get', err);
    response.sendStatus(500);
  })
})

module.exports = router;
