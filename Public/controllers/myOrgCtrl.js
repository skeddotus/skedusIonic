angular.module("skedApp").controller("myOrgCtrl", function($scope, orgService, authService, user){

	$scope.user = user;

	$scope.getMyOrgs = function(user){
		orgService.getMyOrgs($scope.user).then(function(res){
			$scope.myOrgs = res;
		});
	};
	$scope.getMyOrgs($scope.user);
	console.log("currentUser:", $scope.user);

	$scope.cancelAppt = function(apptID){
		orgService.cancelAppt(apptID).then(function(){

		});
	};

	$scope.leaveOrg = function(orgId){
		orgService.leaveOrg($scope.user._id, orgId).then(function(){
			console.log("no longer member or org :(")
		})
	};

	

});