angular.module("skedApp").controller("aptAvailabilityCtrl", function($scope, $state, aptService, mainService){

	$scope.createApt = function(newApt, orgID, userID){
		$scope.newApt.startsAt = (moment($('#datetimepicker6').data("DateTimePicker").date())._d).getTime();
		switch($scope.newApt.endsAt){
			case "15 Minutes":
				$scope.newApt.endsAt = moment($('#datetimepicker6').data("DateTimePicker").date()).add(15, "minutes")._d.getTime();
				break;
			case "30 Minutes":
				$scope.newApt.endsAt = moment($('#datetimepicker6').data("DateTimePicker").date()).add(30, "minutes")._d.getTime();
				break;
			case "45 Minutes":
				$scope.newApt.endsAt = moment($('#datetimepicker6').data("DateTimePicker").date()).add(45, "minutes")._d.getTime();
				break;
			case "1 Hour":
				$scope.newApt.endsAt = moment($('#datetimepicker6').data("DateTimePicker").date()).add(1, "hour")._d.getTime();
				break;
		}
		aptService.createApt($scope.newApt, $state.params.id, userID).then(function(){
			$scope.newApt = ''
			$scope.getMyOpenApts($state.params.id, $scope.user._id);
		});
	};

	$scope.aptDurations = ['15 Minutes', '30 Minutes', '45 Minutes', '1 Hour'];

	$scope.getMyOpenApts = function(orgID, userID){
		aptService.getMyOpenApts(orgID, userID).then(function(results){
			$scope.myOpenApts = results;
		});
	};
	$scope.getMyOpenApts($state.params.id, $scope.user._id);

});