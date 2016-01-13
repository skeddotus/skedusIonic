angular.module("skedApp").controller("leaveCtrl", function($scope, leaveService){

	$scope.leaveOrg = function(user, org){
		leaveService.leaveOrg($scope.user, thisOrgID however its gotten).then(function(){
			console.log("organization be gone")
		})
	}

});