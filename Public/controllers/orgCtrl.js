angular.module("skedApp").controller("orgCtrl", function($scope){

  var appts = [
	  	{
	  		mentor: "Rory",
	  		date: "1/22/2016",
	  		time: "2:00pm - 2:30pm",
	  		specialty: "finance, accounting",
	  	}, 
	  	{
	  		mentor: "Dominique",
	  		date: "1/24/2016",
	  		time: "1:00pm - 1:30pm",
	  		specialty: "marketing, product development",
	  	}, 
	  	{
	  		mentor: "Howard",
	  		date: "1/27/2016",
	  		time: "8:00a - 8:30a",
	  		specialty: "entrepreneurship, Human Resources",
	  	},
	  	{
	  		mentor: "Kyle",
	  		date: "1/28/2016",
	  		time: "10:00a - 10:30a",
	  		specialty: "sales",
	  	},
	  	{
	  		mentor: "Leo",
	  		date: "1/29/2016",
	  		time: "11:00a - 11:30a",
	  		specialty: "interships",
	  	},
	]

  	$scope.appts = appts;

});
