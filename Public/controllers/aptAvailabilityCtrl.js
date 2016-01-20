angular.module("skedApp").controller("aptAvailabilityCtrl", function($scope, $state, aptService, mainService){

	$scope.createApt = function(newApt, orgID, userID){
		$scope.newApt.startsAt = (moment($('#datetimepicker6').data("DateTimePicker").date())._d).getTime();
		$scope.newApt.endsAt = (moment($('#datetimepicker7').data("DateTimePicker").date())._d).getTime();
		aptService.createApt($scope.newApt, $state.params.id, userID).then(function(){
			$scope.newApt = ''
			$scope.getMyOpenApts($state.params.id, $scope.user._id);
		});
	};

	$scope.getMyOpenApts = function(orgID, userID){
		aptService.getMyOpenApts(orgID, userID).then(function(results){
			$scope.myOpenApts = results;
		});
	};
	$scope.getMyOpenApts($state.params.id, $scope.user._id);

	$scope.cancelOpenApt = function(aptID){
		swal({
			title: "Are you sure you want to Cancel Appointment?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes",
			cancelButtonText: "No, I want to keep it!",
		}, function(isConfirm){
			if(isConfirm){
				console.log("aptID is: " + aptID);
				mainService.cancelApt(aptID).then(function(){
					$scope.getMyOpenApts($state.params.id, $scope.user._id);
				});
			};
		});
	};

});
