angular.module("skedApp").controller("authCtrl", function($scope, authService, $state){

  $scope.signup = function(newUser){
    if(newUser.password !== $scope.password2){
      swal({
        title: "Passwords don't match",
        type: "error",
        allowOutsideClick: true,
      })
    } else {
      authService.addUser(newUser).then(function(res){
      	$state.go('login');
      }).catch(function(err) {
      	if (err.status) {
      		$scope.error = "Sorry, that user already exists.";
      	}
      });
    }
  };

  $scope.login = function(){
    authService.login({
    	email: $scope.email,
    	password: $scope.password
    }).then(function(res){
      $scope.credentials = {};
      $state.go('auth.myHome');
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
