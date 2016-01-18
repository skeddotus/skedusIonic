angular.module("skedApp").controller("authCtrl", function($scope, authService, $state){

  $scope.test = "controller link test successful";
  $scope.newUser = {};

  $scope.signup = function(){
    console.log("email: ",$scope.newUser.email);
    authService.addUser($scope.newUser).then(function(res){
    	$state.go('login');
    }).catch(function(err) {
    	if (err.status) {
    		$scope.error = "Sorry, that user already exists.";
    	}
    });
  };

  $scope.login = function(){
    authService.login({
    	email: $scope.email,
    	password: $scope.password
    }).then(function(){
      $scope.credentials = {};
      $state.go('auth.myOrg');
    });
  }

  $scope.logout = function() {
    authService.logout().then(function() {
      $state.go('login');
    });
  }

  $scope.randomUser = function() {
    authService.getRandomUser().then(function(results) {
      $scope.newUser.firstName = results.firstName;
      $scope.newUser.lastName = results.lastName;
      $scope.newUser.email = results.email;
      $scope.newUser.password = results.password;
      $scope.password2 = results.password;
      console.log('RandomUser', $scope.newUser);
    });
  };

});
