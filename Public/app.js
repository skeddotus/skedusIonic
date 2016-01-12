angular.module("skedApp", ["ui.router"]).config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider

		.state("landingPage", {
			url: "/",
			controller: "mainCtrl",
			templateUrl: "templates/landingPage.html",
		})
		// .state("login", {
		// 	url: "/login",
		// 	controller: "mainCtrl",
		// 	templateUrl: "templates/login.html",
		// })
		// .state("register", {
		// 	url: "/register",
		// 	controller: "mainCtrl",
		// 	templateUrl: "templates/register.html",
		// })


		// .state("home", {
		// 	url: "/home",
		// 	controller: "homeCtrl",
		// 	templateUrl: "templates/home.html",
		// })

		.state("schedule", {
			url: "/schedule",
			controller: "scheduleCtrl",
			templateUrl: "templates/schedule.html",
		})
		.state("availability", {
			url: "/availability",
			controller: "availabilityCtrl",
			templateUrl: "templates/availability.html",
		})

		.state("profile", {
			url: "/profile",
			controller: "profileCtrl",
			templateUrl: "templates/profile.html",
		})
		.state("join", {
			url: "/join",
			controller: "joinCtrl",
			templateUrl: "templates/join.html",
		})
		.state("create", {
			url: "/create",
			controller: "createCtrl",
			templateUrl: "templates/create.html",
		})
		.state("manage", {
			url: "/manage",
			controller: "manageCtrl",
			templateUrl: "templates/manage.html",
		})




// ORG ////////////////////////////////////////////////////////////////



// MENTOR ////////////////////////////////////////////////////////////////



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

// ORG ////////////////////////////////////////////////////////////////
	.state("org", {
		url: "/org",
		controller: "orgCtrl",
		templateUrl: "templates/org.html",
	})

//AUTH STATES ////////////////////////////////////////////////////////////////
	.state('auth', {
		abstract: true,
		template: '<ui-view><ui-view>',
		resolve: {
			user: function(authService) {
				return authService.getAuthedUser();
			}
		}
	})

	// MENTOR

		.state("auth.mentor", {
			url: "/mentor",
			controller: "mentorCtrl",
			templateUrl: "templates/mentor.html",
		})

// MENTEE ////////////////////////////////////////////////////////////////

		.state("auth.mentee", {
			url: "/mentee",
			controller: "menteeCtrl",
			templateUrl: "templates/mentee.html",
		})

	// HOME

	.state("auth.home", {
		url: "/home",
		controller: "homeCtrl",
		templateUrl: "templates/home.html"
	});


	$httpProvider.interceptors.push(function($q, $injector, $location) {
    return {
      // This is the responseError interceptor
      responseError: function(rejection) {
        console.log("BAD DOG", rejection);
        if (rejection.status === 401) {
          document.location = "/login";
        }

        /* If not a 401, do nothing with this error.
         * This is necessary to make a `responseError`
         * interceptor a no-op. */
        return $q.reject(rejection);
      }
    };
	});


});
