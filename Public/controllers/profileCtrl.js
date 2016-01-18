angular.module("skedApp").controller("profileCtrl", function($scope, userService){


	var getUser = function(userID){
		userService.getUser(userID).then(function(res){
			$scope.user = res;
		})
	};
	getUser($scope.user._id)

	$scope.updateUser = function(userID){
		userService.updateUser($scope.user._id, $scope.userUpdates).then(function(){
			$scope.userUpdates = "";
			return getUser($scope.user._id);
			console.log("user profile updated");
		});
	};

	$scope.deactivateUser = function(userID){
		userService.deactivateUser(userID).then(function(){
			return getUser($scope.user._id);
		});
	};


});