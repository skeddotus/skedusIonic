angular.module("skedApp").controller("joinOrgCtrl", function($scope, $rootScope, orgService, user){

	$scope.user = user;

	$scope.getOrgs = function(){
		orgService.getOrgs().then(function(res){
			$scope.orgs = res;
		})
	}
	$scope.getOrgs();

	$scope.joinOrg = function(orgId){
		orgService.joinOrg($scope.user, orgId)
		.then(function(){
			console.log("organization joined")

			//Sends a message to homeCtrl and let it know user just joined an org
			$rootScope.$emit("joinedOrg", {});
		})
	}
	console.log($scope.user)

});
