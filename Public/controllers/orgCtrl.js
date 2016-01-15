angular.module("skedApp").controller("orgCtrl", function($scope, orgService, user, $state){

	$scope.getAppts = function(orgID){
		orgService.getAppts($state.params.id).then(function(results){
			$scope.appts = results;
		})
	}
	$scope.getAppts($state.params.id)

});