angular.module("skedApp").service("authService", function($http, $q, $state, $rootScope){

	var user;

  this.addUser = function(newUser){
    console.log("sent data 2 userService");
    console.log(newUser);
    var dfd = $q.defer();
    $http({
      method: 'POST',
      url: '/api/users',
      data: {
        name: newUser.firstName + " " + newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      },
    }).then(function(res) {
      console.log("Result from user login,", res)
      dfd.resolve(res.data);
    })
    return dfd.promise;
  };

  this.login = function(credentials){
    console.log(credentials);
    var dfd = $q.defer()
    $http({
      method: 'POST',
      url: '/api/auth/local',
      data: credentials
    }).then(function(res){
      console.log('Result from user login', res)
      dfd.resolve(res);
    }).catch(function(res) {
      console.log("cannot login", res);
      $state.go('login');
    })
    return dfd.promise;
  }

  this.logout = function(){
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/api/auth/logout'
    })
    .then(function(res){
      dfd.resolve(res);
      $state.go('login');
    })
    return dfd.promise;
  }

  this.getAuthedUser = function(){
    var dfd = $q.defer()
    if(user){
      dfd.resolve(user);
    } else {
      $http({
        method: 'GET',
        url: '/api/users/currentuser'
      }).then(function(res){
        user = res.data;
        console.log('Result getting the logged in user', res);
        dfd.resolve(user);
      })
    }
    return dfd.promise;
  };

	this.getRandomUser = function() {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/users/rando'
		}).then(function(res) {
			user = res.data;
			console.log('Random User', user);
			dfd.resolve(user);
		});
		return dfd.promise;
	};

});
