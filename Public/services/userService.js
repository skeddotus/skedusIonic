angular.module("skedApp").service("userService", function($http, $q) {

  this.getUser = function(userID) {
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: 'api/user/' + userID,
    }).then(function(res) {
      user = res.data;
      dfd.resolve(user);
    });
    return dfd.promise;
  };

  this.updateUser = function(userID, updateData) {
    var dfd = $q.defer();
    $http({
      method: 'PUT',
      url: 'api/user/' + userID,
      data: updateData
    }).then(function() {
      dfd.resolve();
    });
    return dfd.promise;
  };

  this.deactivateUser = function(userID) {
    var dfd = $q.defer();
    $http({
      method: 'PUT',
      url: 'api/user/' + userID,
      data: {
        status: "Archived",
      }
    }).then(function() {
      dfd.resolve();
    })
    return dfd.promise;
  };

});
