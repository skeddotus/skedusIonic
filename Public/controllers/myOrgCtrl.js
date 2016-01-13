angular.module("skedApp").controller("myOrgCtrl", function($scope, myOrgService, user){

	$scope.user = user;

	$scope.getMyOrgs = function(currentUser){
		myOrgService.getMyOrgs($scope.user).then(function(res){
			$scope.myOrgs = res;
		});
	};
	$scope.getMyOrgs($scope.user);

});