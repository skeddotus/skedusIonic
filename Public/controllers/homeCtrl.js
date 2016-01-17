angular.module("skedApp").controller("homeCtrl", function($scope, $rootScope, authService, orgService, user){

  //Page title
  $scope.pageTitle = "Schedule";

  //Company logo and name
  $scope.logoImg = "http://www.unicorn-cs.co.uk/SiteAssets/unicorn-logo-2.jpg";
  $scope.companyName = "Sked.Us Inc.";


  //Get user specific organization list
	$scope.user = user;

	$scope.getMyOrgs = function(user){
		orgService.getMyOrgs($scope.user).then(function(res){
			$scope.myOrgs = res;
		});
	};
	$scope.getMyOrgs($scope.user);


  //Listen for joinOrg method in joinOrgCtrl and run getMyOrgs to refresh page
  $rootScope.$on("joinedOrg", function(){
    $scope.joinOrg();
  });

  $scope.joinOrg = function() {
    $scope.getMyOrgs = function(user){
  		orgService.getMyOrgs($scope.user).then(function(res){
  			$scope.myOrgs = res;
  		});
  	};
  	$scope.getMyOrgs($scope.user);
  }
  // ------------------------------------



  // $('.navmenu-fixed-left').offcanvas({
  //   placement: 'left',
  //   autohide: 'true',
  //   recalc: 'true',
  //   toggle: false
  // });


  $scope.logout = function() {
    authService.logout();
  };

  // $scope.checkRole = function() {
  //   switch (role) {
  //     case Admin:
  //       $scope.
  //       break;
  //     case Mentor:
  //       $scope.
  //       break;
  //     default:
  //       $scope.
  //       break;
  //   }
  // }

});
