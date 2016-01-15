angular.module("skedApp").controller("profileCtrl", function($scope, userService){


	var getUser = function(userId){
		userService.getUser_id($scope.user._id).then(function(res){
			$scope.user = res;
		})
	};
	getUser($scope.user._id)

	$scope.updateUser = function(userId){
		userService.updateUser($scope.user._id, $scope.userUpdates).then(function(){
			$scope.userUpdates = "";
			return getUser($scope.user._id);
			console.log("user profile updated");
		});
	};


});