angular.module("skedApp", ["ui.router"]).config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$urlRouterProvider.otherwise("/login");

	$stateProvider

		.state("landingPage", {
			url: "/",
			controller: "mainCtrl",
			templateUrl: "templates/landingPage.html",
		})

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
		abstract: true,
		template: '<div ui-view><div>',
		resolve: {
			user: function(authService) {
				return authService.getAuthedUser();
			}
		}
	})

	// HOME
	.state("auth.home", {
		url: "/home",
		controller: "homeCtrl",
		templateUrl: "templates/home.html"
	})

		.state("auth.home.schedule", {
			url: "/schedule",
			controller: "scheduleCtrl",
			templateUrl: "templates/schedule.html"
		})

		.state("auth.home.dashboard", {
			url: "/dashboard",
			controller: "availabilityCtrl",
			templateUrl: "templates/availability.html",
		})

		.state("auth.home.userManage", {
			url: "/manage",
			controller: "joinCtrl",
			templateUrl: "templates/join.html",
		})

		.state("auth.home.orgProfile", {
			url: "/organization",
			controller: "createCtrl",
			templateUrl: "templates/create.html",
		})

		.state("auth.home.userProfile", {
			url: "/profile",
			controller: "manageCtrl",
			templateUrl: "templates/manage.html",
		})

		// test route
		.state("auth.home.testRoute", {
			url: "/test",
			controller: "testCtrl",
			templateUrl: "templates/test.html",
		})


	$httpProvider.interceptors.push(function($q, $injector, $location) {
    return {
      // This is the responseError interceptor
      responseError: function(rejection) {
        console.log("BAD DOG", rejection);
        if (rejection.status === 401) {
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
