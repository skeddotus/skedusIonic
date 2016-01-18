angular.module("skedApp").controller("skedAptOrgCtrl", function($scope, $state, skedAptService){

	$scope.getOrgOpenApts = function(orgID){
		skedAptService.getOrgOpenApts(orgID).then(function(results){
			$scope.orgOpenApts = results;
		});
	};
	$scope.getOrgOpenApts($state.params.id);

	$scope.getOrg = function(orgID){
		skedAptService.getOrg(orgID).then(function(result){
			$scope.thisOrg = result;
		});
	};
	$scope.getOrg($state.params.id);

	$scope.skedApt = function(aptID){
		skedAptService.skedApt(aptID, $scope.user._id).then(function(){
			$scope.getOrgOpenApts($state.params.id);
		});
	};

});