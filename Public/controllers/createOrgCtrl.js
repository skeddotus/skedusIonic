angular.module("skedApp").controller("createOrgCtrl", function($scope, orgService, user){

	$scope.user = user;

	$scope.createOrg = function(){
		orgService.createOrg($scope.newOrg, $scope.user).then(function(){
			$scope.newOrg = ""
		})
	};

});