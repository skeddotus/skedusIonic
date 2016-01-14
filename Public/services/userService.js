angular.module("skedApp").service("userService", function($http, $q) {

  this.getUsers = function(res) {
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/api/users',
    }).then(function(res) {
      users = res.data;
      console.log(users);
      dfd.resolve(users);
    });
    return dfd.promise;
  };

  this.getUser_id = function(res) {
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: 'api/user/' + userId,
    }).then(function(res) {
      user = res.data;
      dfd.resolve(user);
    });
    return dfd.promise;
  };

  this.updateUser = function(userId, updateData) {
    var dfd = $q.defer();
    $http({
      method: 'PUT',
      url: 'api/users/' + userId,
      data: updateData
    }).then(function() {
      dfd.resolve();
    });
    return dfd.promise;
  };

  this.deleteUser = function(userId) {
    var dfd = $q.defer();
    $http({
      method: 'PUT',
      url: 'api/users/' + userId
    }).then(function() {
      dfd.resolve();
    })
    return dfd.promise;
  };

});
