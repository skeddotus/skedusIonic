angular.module("skedApp").controller("testCtrl", function($scope, userService, usersRef, $state) {

  $scope.test = "This is the test route";

  $scope.users = usersRef;


});
