angular.module("skedApp").controller("orgCtrl", function($scope, orgService, user, $state){

	$scope.getOrgUsers = function(orgID){
		orgService.getOrgUsers(orgID).then(function(results){
			console.log("results: ", results)
			// var sorted = results.sort(function(a, b) {
			//     var textA = a.userid.lastName.toUpperCase();
			//     var textB = b.userid.lastName.toUpperCase();
			//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			// });
			$scope.orgUsers = results;
		})
	};
	$scope.getOrgUsers($state.params.id);

	var getOrg = function(orgID){
		orgService.getOrg($state.params.id).then(function(results){
			$scope.currentOrg = results;
		})
	};
	getOrg($state.params.id);

});