angular.module("skedApp").controller("createCtrl", function($scope, createService){

	$scope.createOrg = function(newOrg){
		createService.createOrg($scope.newOrg).then(function(){
			$scope.newOrg = ""
		})
	};

});