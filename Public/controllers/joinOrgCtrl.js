angular.module("skedApp").controller("joinOrgCtrl", function($scope, joinOrgService, user){

	$scope.user = user;

	$scope.getOrgs = function(){
		joinOrgService.getOrgs().then(function(res){
			$scope.orgs = res;
		})
	}

	$scope.joinOrg = function(user, org){
		joinOegService.joinOrg($scope.user, thisOrgIDhoweveritsgotten).then(function(){
			console.log("organization joined")
		})
	}

});