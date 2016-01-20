angular.module("skedApp").controller("skedAptOrgCtrl", function($scope, $state, skedAptService){

	$scope.getOrgApts = function(orgID){
		skedAptService.getOrgApts(orgID).then(function(results){
			$scope.orgApts = results;
			$scope.events = results;
		});
	};
	$scope.getOrgApts($state.params.id);

	$scope.getOrg = function(orgID){
		skedAptService.getOrg(orgID).then(function(result){
			$scope.thisOrg = result;
		});
	};
	$scope.getOrg($state.params.id);

	$scope.skedApt = function(aptID){
		skedAptService.skedApt(aptID, $scope.user._id).then(function(){
			$scope.getOrgApts($state.params.id);
			$scope.getMyMenteeBookedApts($scope.user._id);
		});
	};

});