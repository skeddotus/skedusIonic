angular.module("skedApp").controller("orgManagementCtrl", function($scope, $state, $timeout, orgService){

	$scope.getOrgUsers = function(orgID){
		orgService.getOrgUsers(orgID).then(function(results){
			var sorted = results.sort(function(a, b) {
			    var textA = a.userid.lastName.toUpperCase();
			    var textB = b.userid.lastName.toUpperCase();
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});
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
		orgService.updateOrg($state.params.id, $scope.orgUpdateData).then(function(res){
			if(res === "exists"){
				return swal({
					title: "Organization name already exists.",
					text: "Please try again.",
					type: "error",
					allowEscapeKey: true,
					allowOutsideClick: true,
				});
			};
			$scope.getMyOrgs($scope.user._id);
			$scope.orgUpdateData = "";
			return getOrg($state.params.id);
		});
	};

	$scope.deactivateOrg = function(orgID){
		swal({
			title: "Are you sure you want to deactivate organization?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Deactivate",
			cancelButtonText: "Cancel",
		}, function(isConfirm){
			if(isConfirm){
				orgService.deactivateOrg(orgID).then(function(){
					$scope.getMyOrgs($scope.user._id);
				});
			};
		$state.go("auth.myHome");
		});
	};

	$scope.makeAdmin = function(userID){
		orgService.makeAdmin(userID, $state.params.id).then(function(){
			$scope.getOrgUsers($state.params.id);
		});
	};

	$scope.makeMentor = function(userID){
		orgService.makeMentor(userID, $state.params.id).then(function(){
			$scope.getOrgUsers($state.params.id);
		});
	};

	$scope.makeUser = function(userID){
		orgService.makeUser(userID, $state.params.id).then(function(){
			$scope.getOrgUsers($state.params.id);
		});
	};

	$scope.removeUser = function(userID){
		swal({
			title: "Are you sure you want to remove user?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Remove",
			cancelButtonText: "Cancel",
		}, function(isConfirm){
			if(isConfirm){
				orgService.removeUser(userID, $state.params.id).then(function(){
					$scope.getOrgUsers($state.params.id);
				})
			};
		});
	};

});