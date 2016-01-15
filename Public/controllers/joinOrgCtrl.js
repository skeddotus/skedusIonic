angular.module("skedApp").controller("joinOrgCtrl", function($scope, orgService, user){

	$scope.user = user;

	$scope.getOrgs = function(){
		orgService.getOrgs().then(function(res){
			$scope.orgs = res;
		})
	}
	$scope.getOrgs();

	$scope.joinOrg = function(orgId){
		orgService.joinOrg($scope.user, orgId).then(function(){
			console.log("organization joined")
		})
	}
	console.log($scope.user)

});