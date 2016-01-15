angular.module("skedApp", ["ui.router"]).config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$urlRouterProvider.otherwise("/login");

	$stateProvider

// AUTHORIZATION ////////////////////////////////////////////////////////////////

		.state('login', {
				url: '/login',
				templateUrl: 'templates/login.html',
				controller: 'authCtrl'
			})

		.state('signup', {
			url: '/signup',
			templateUrl: 'templates/signup.html',
			controller: 'authCtrl'
		})

//AUTH STATES ////////////////////////////////////////////////////////////////
		.state('auth', {
			url: "",
			templateUrl: "templates/home.html",
			controller: "homeCtrl",
			resolve: {
				user: function(authService) {
					return authService.getAuthedUser();
				}
			}
		})

		.state("auth.myOrg", {
			url: "/home",
			controller: "myOrgCtrl",
			templateUrl: "templates/myOrg.html"
		})
		.state("auth.createOrg", {
			url: "/create",
			controller: "createOrgCtrl",
			templateUrl: "templates/createOrg.html"
		})
		.state("auth.joinOrg", {
			url: "/join",
			controller: "joinOrgCtrl",
			templateUrl: "templates/joinOrg.html"
		})
		.state("auth.org", {
			url: "/org/:id",
			controller: "orgCtrl",
			templateUrl: "templates/org.html"
		})



		.state("auth.schedule", {
			url: "/schedule",
			controller: "scheduleCtrl",
			templateUrl: "templates/schedule.html"
		})

		.state("auth.dashboard", {
			url: "/dashboard",
			controller: "availabilityCtrl",
			templateUrl: "templates/availability.html",
		})

		.state("auth.userManage", {
			url: "/manage",
			controller: "joinCtrl",
			templateUrl: "templates/join.html",
		})

		.state("auth.orgProfile", {
			url: "/organization",
			controller: "createCtrl",
			templateUrl: "templates/create.html",
		})

		.state("auth.userProfile", {
			url: "/profile",
			controller: "manageCtrl",
			templateUrl: "templates/manage.html",
		})

		// test route
		.state("auth.testRoute", {
			url: "/test",
			controller: "testCtrl",
			templateUrl: "templates/test.html",
		})


	$httpProvider.interceptors.push(function($q, $injector, $location) {
    return {
      // This is the responseError interceptor
      responseError: function(rejection) {
        if (rejection.status === 401) {
          console.log("BAD DOG", rejection);
          document.location = "/#/login";

        }

        /* If not a 401, do nothing with this error.
         * This is necessary to make a `responseError`
         * interceptor a no-op. */
        return $q.reject(rejection);
      }
    };
	});


});
