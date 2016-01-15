angular.module("skedApp").service('apptService', function($http, $q) {

  this.createAppt = function(newAppt) {
    var drd = $q.defer();
    $http({
      method: 'POST',
      url: 'api/appt',
      data: newAppt
    }).then(function() {
      dfd.resolve();
    })
    return dfd.promise;
  }

  this.getAppts = function(res) {
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/api/appts',
    }).then(function(res) {
      appts = res.data;
      dfd.resolve(appts);
    });
    return dfd.promise;
  };

});
