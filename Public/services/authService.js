angular.module("skedApp").service("authService", function($http, $q, $state, $rootScope){

	var user;

  this.addUser = function(newUser){
    var dfd = $q.defer();
    $http({
      method: 'POST',
      url: '/api/users',
      data: newUser,
    }).then(function(res) {
      dfd.resolve(res.data);
    }).catch(function(res) {
      if(res.status === 409){
        swal({
          title: "Account with that email already exists.",
          type: "error",
          allowOutsideClick: true,
        });
      };
    })
    return dfd.promise;
  };

  this.login = function(credentials){
    // console.log(credentials);
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
       if(res.status !== 200){
        swal({
          title: "Email and Password combination not found",
          text: "Please try again",
          type: "error",
          allowOutsideClick: true,
        });
      };
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
        url: '/api/users/currentUser'
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
