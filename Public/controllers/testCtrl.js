angular.module("skedApp").controller("testCtrl", function($scope, userService, usersRef, orgService, user, $state) {

  $scope.test = "This is the test route";

  $scope.users = usersRef;

  $scope.user = user;

  $scope.getMyOrgs = function(){
		orgService.getMyOrgs($scope.user)
    .then(function(res) {
			$scope.myOrgs = res;
		});
	};
	$scope.getMyOrgs($scope.user);

});
