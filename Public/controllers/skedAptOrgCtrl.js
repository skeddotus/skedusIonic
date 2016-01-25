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

	$scope.skedApt = function(apt){
		console.log("apt", apt)
		skedAptService.skedApt(apt._id, $scope.user._id).then(function(){
			swal({
				title: "You've successfully scheduled your appointment with " + apt.mentor.name + "!",
				allowEscapeKey: true,
				allowOutsideClick: true,
				timer: 3000,
			})
			$scope.getOrgApts($state.params.id);
			$scope.getMyMenteeBookedApts($scope.user._id);
		});
	};

});