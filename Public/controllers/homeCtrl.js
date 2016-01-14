angular.module("skedApp").controller("homeCtrl", function($scope, authService){

  //Page title
  $scope.pageTitle = "Calendar";

  //Company logo and name
  $scope.logoImg = "http://www.unicorn-cs.co.uk/SiteAssets/unicorn-logo-2.jpg";
  $scope.companyName = "Sked.Us Inc.";


  $scope.$watch(function(){
   return window.innerWidth;
}, function(value) {
        console.log(value);
  });


  // 	var orgs = [
	//   	{
	//   		name: "org1",
	//   		desc: "we build things",
	//   	},
	//   	{
	//   		name: "org2",
	//   		desc: "we destroy things",
	//   	},
	//   	{
	//   		name: "org3",
	//   		desc: "we fix things",
	//   	},
	//   	{
	//   		name: "org4",
	//   		desc: "we design things",
	//   	},
	// ];
  //
  // 	$scope.orgs = orgs;
  //
  //
  // 	var appts = [
	//   	{
	//   		mentor: "Rory",
	//   		date: "1/22/2016",
	//   		time: "2:00pm - 2:30pm",
	//   		specialty: "finance, accounting",
	//   	},
	//   	{
	//   		mentor: "Dominique",
	//   		date: "1/24/2016",
	//   		time: "1:00pm - 1:30pm",
	//   		specialty: "marketing, product development",
	//   	},
	//   	{
	//   		mentor: "Howard",
	//   		date: "1/27/2016",
	//   		time: "8:00a - 8:30a",
	//   		specialty: "entrepreneurship, Human Resources",
	//   	},
	//   	{
	//   		mentor: "Kyle",
	//   		date: "1/28/2016",
	//   		time: "10:00a - 10:30a",
	//   		specialty: "sales",
	//   	},
	//   	{
	//   		mentor: "Leo",
	//   		date: "1/29/2016",
	//   		time: "11:00a - 11:30a",
	//   		specialty: "interships",
	//   	},
	// ];
  //
  // 	$scope.appts = appts;



  $scope.logout = function() {
    authService.logout();
  };


});
