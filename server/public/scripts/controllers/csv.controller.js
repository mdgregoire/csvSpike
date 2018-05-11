myApp.controller('CSVController',  ['Upload', '$timeout', '$http', function(Upload, $timeout, $http) {
  let self = this;
  // self.export = {};
  self.csvString = ''
  let debug = true

  if(debug){console.log('in csv.controller')};


//this uploads the .csv file to the db
  self.uploadFiles = function(file, errFiles) {
    // self.f = file;
    // self.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
          url: `/upload`,
          data: {file: file}
      });
    file.upload.then(function (response) {
        $timeout(function () {
            file.result = response.data;
        });
    });
    }
    if(debug){console.log('.csv File Successfuly Uploaded!')};
  }
//end uploadFiles

self.createCSV = function (){
  if(debug){console.log('in createCSV')};
  $http({
    method: 'GET',
    url: '/download'
  }).then(function(response){
    // self.export.response = response.data.rows;
    // if(debug){console.log(self.export, 'data from db')};
    console.log(response.data, 'in createcsv');
    self.createStringForCSV(response.data.rows);
  }).catch(function(error){
    if(debug){console.log('error in get DB', error)};
  })
}

self.createStringForCSV = function(data) {
  if(debug){console.log('in createStringForCSV', data)};
  let objectLength = Object.keys(data[0]).length;
  self.csvString += 'id, col1, col2, col3\n'; //this sets the header of the resulting file
  for (i=0; i<data.length; i++){
    self.csvString += data[i].id + ',';
    self.csvString += data[i].col1 + ',';
    self.csvString += data[i].col2 + ',';
    self.csvString += data[i].col3 + '\n';
  }
  if(debug){console.log( 'creating csv with string:', self.csvString )};
  self.downloadCsv( self.csvString, 'test.csv' );
}
//end createStringForCSV

self.downloadCsv = function(string, filename){
  if(debug){console.log('in download .csv', string, filename)};
  let data = encodeURI( 'data:text/csv;charset=utf-8,' + string );
    link = document.createElement( 'a' );
    link.setAttribute( 'href', data );
    link.setAttribute( 'download', filename );
    link.click();
    self.csvString = ''; //this clears the string after the file has been downloaded
}





}]);// end CSVController
