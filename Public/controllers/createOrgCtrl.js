angular.module("skedApp").controller("createOrgCtrl", function($scope, createOrgService){

	$scope.createOrg = function(newOrg){
		createOrgService.createOrg($scope.newOrg).then(function(){
			$scope.newOrg = ""
		})
	};

});