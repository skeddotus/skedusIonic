angular.module("skedApp").controller("joinCtrl", function($scope, joinService, user){

	$scope.user = user;

	$scope.getOrgs = function(){
		joinService.getOrgs().then(function(res){
			$scope.orgs = res;
		})
	}

	$scope.joinOrg = function(user, org){
		joinService.joinOrg($scope.user, thisOrgID however its gotten).then(function(){
			console.log("organization joined")
		})
	}

});