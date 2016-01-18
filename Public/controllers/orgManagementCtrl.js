angular.module("skedApp").controller("orgManagementCtrl", function($scope, $state, orgService){



	

	$scope.getOrgUsers = function(orgID){
		orgService.getOrgUsers(orgID).then(function(results){
			console.log("results: ", results)
			var sorted = results.sort(function(a, b) {
			    var textA = a.userid.name.toUpperCase();
			    var textB = b.userid.name.toUpperCase();
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});
			// for(var i = 0; i < sorted.length; i++){
			// 	if(sorted[i].role === "Admin"){
			// 		document.getElementById("admin-btn").className = "disabled";
			// 	} else if(sorted[i].role === "Mentor"){
			// 		document.getElementById("mentor-btn").className = "disabled";
			// 	} else document.getElementById("user-btn").className = "disabled";
			// }
			$scope.orgUsers = sorted;
		})
	};
	$scope.getOrgUsers($state.params.id);

	var getOrg = function(orgID){
		orgService.getOrg($state.params.id).then(function(results){
			$scope.currentOrg = results;
		})
	};
	getOrg($state.params.id);

	$scope.updateOrg = function(){
		orgService.updateOrg($state.params.id, $scope.orgUpdateData).then(function(){
			$scope.getMyOrgs($scope.user._id);
			$scope.orgUpdateData = "";
			return getOrg($state.params.id);
		});
	};

	$scope.deactivateOrg = function(orgID){
		orgService.deactivateOrg(orgID).then(function(){
		});
	};

});