angular.module("skedApp").controller("aptAvailabilityCtrl", function($scope, $state, aptService){

	$scope.createApt = function(newApt, orgID, userID){
		$scope.newApt.startTime = (moment($('#datetimepicker6').data("DateTimePicker").date())._d).getTime();
		$scope.newApt.endTime = (moment($('#datetimepicker7').data("DateTimePicker").date())._d).getTime();
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

});