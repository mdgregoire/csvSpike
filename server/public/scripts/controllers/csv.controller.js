myApp.controller('CSVController',  ['Upload', '$timeout', '$http',
  function(Upload, $timeout, $http {
  let self = this;
  let debug = true

  if(debug){console.log('in csv.controller')};


//this uploads the .csv file to the db
  self.uploadFiles = function(file, errFiles) {
    self.f = file;
    self.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
          url: `/upload`,
          data: {file: file}
      });
    file.upload.then(function (response) {
        $timeout(function () {
            file.result = response.data;
        });
    }, function (response) {
        if (response.status > 0)
            self.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
                                 evt.loaded / evt.total));
    });
    }
    if(debug){console.log('.csv File Successfuly Uploaded!')};

  }
//end uploadFiles

}]);// end ListController
