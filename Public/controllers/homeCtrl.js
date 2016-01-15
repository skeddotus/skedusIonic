angular.module("skedApp").controller("homeCtrl", function($scope, authService, orgService, user){

  //Page title
  $scope.pageTitle = "Schedule";

  //Company logo and name
  $scope.logoImg = "http://www.unicorn-cs.co.uk/SiteAssets/unicorn-logo-2.jpg";
  $scope.companyName = "Sked.Us Inc.";


  // $scope.$watch(function(){
  //  return window.innerWidth;
  // }, function(value) {
  //     console.log(value);
  // });
	$scope.user = user;

	$scope.getMyOrgs = function(user){
		orgService.getMyOrgs($scope.user).then(function(res){
			$scope.myOrgs = res;
		});
	};
	$scope.getMyOrgs($scope.user);


  $scope.logout = function() {
    authService.logout();
  };


});
