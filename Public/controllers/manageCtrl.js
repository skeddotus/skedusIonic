angular.module("skedApp").controller("manageCtrl", function($scope){

	var users = [
	  	{
	  		name: "Rory",
	  		role: "mentee"
	  	}, 
	  	{
	  		name: "Dominique",
	  		role: "mentee"
	  	}, 
	  	{
	  		name: "Howard",
	  		role: "mentee"
	  	},
	  	{
	  		name: "Kyle",
	  		role: "mentee"
	  	},
	  	{
	  		name: "Leo",
	  		role: "mentor"
	  	},
	]

  	$scope.users = users;

  	var orgs = [
	  	{
	  		name: "org1",
	  		desc: "we build things",
	  	}, 
	  	{
	  		name: "org2",
	  		desc: "we destroy things",
	  	}, 
	  	{
	  		name: "org3",
	  		desc: "we fix things",
	  	},
	  	{
	  		name: "org4",
	  		desc: "we design things",
	  	},
	]

  	$scope.orgs = orgs;

});