angular.module("skedApp").controller("myhomeCtrl", function($scope, myhomeService, user){

	$scope.user = user;

	$scope.getMyOrgs = function(currentUser){
		myhomeService.getMyOrgs($scope.user).then(function(res){
			$scope.myOrgs = res;
		});
	};
	$scope.getMyOrgs($scope.user);

});