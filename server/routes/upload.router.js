const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const multer = require('multer');
const destination = 'server/public/uploads/'; //this location can be changed if needed

//multer is middleware for handling multipart form data
//multer adds a body and a file object to the request object
//body contains the text values in the form and file contains the files uploaded via the form
//more information can be found at github.com/expressjs/multer
const upload = multer({
  dest: destination
})
//fast-csv provides csv parsing and formatting more info at www.npmjs.com/package/fast-csv
let csv = require('fast-csv')
let fs = require('fs');
let lineReader = require('readLine');
let debug = true; // toggle for console.log

//this is the post for the .csv file
router.post('/', upload.single('file'), function(request, response){
  let file = request.file;
  if(debug){console.log(file, 'file in upload.router');}
  let stream = fs.createReadStream(file.path);
    csv.fromStream(stream, {
                    headers: ["col1", "col2","col3"], //headers must match the order of the queryText
                    renameHeaders: true, //deletes the first line of the .csv file, renames it according to the headers property
                    ignoreEmpty: true,  //skips empty cells
                            })
    .on('data', function(data, callback){
      let queryText = `INSERT INTO "csv_spike_table" (col1, col2, col3)
      VALUES ($1, $2, $3);`;
      pool.query(queryText, [data.col1, data.col2, data.col3])
      .then((result) => {
          if(debug){console.log('success in upload post', result);}
      }).catch((err) => {
          if(debug){console.log('error in upload post', err);}
      });
    }).on("end", function(){
      response.sendStatus(200);
      if(debug){console.log(("done with upload"));}
    })
});
//end POST

module.exports = router;
