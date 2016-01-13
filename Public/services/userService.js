angular.module("skedApp").service("userService", function($http, $q){

  this.getUser = function(res) {
    return $http({
      method: 'GET',
      url: 'api/users',
    }).then(function(res) {
      return res.data;
    });
  };

  this.getUser_id = function(res) {
    return $http({
      method: 'GET',
      url: 'api/user/' + userId,
    }).then(function(res) {
      return res.data;
    });
  };

  this.updateUser = function(userId, updateData) {
    return $http({
      method: 'PUT',
      url: 'api/users/' + userId,
      data: updateData
    });
  };

  this.removeUser = function (userId) {
    return $http({
      method: 'PUT',
      url: 'api/users/' + userId
    });
  };

});
