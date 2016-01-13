angular.module("skedApp").controller("joinOrgCtrl", function($scope, orgService, user){

	$scope.user = user;

	$scope.getOrgs = function(){
		orgService.getOrgs().then(function(res){
			$scope.orgs = res;
		})
	}
	$scope.getOrgs();

	$scope.joinOrg = function(user, org){
		orgService.joinOrg($scope.user, thisOrgIDhoweveritsgotten).then(function(){
			console.log("organization joined")
		})
	}
	console.log($scope.user)

});