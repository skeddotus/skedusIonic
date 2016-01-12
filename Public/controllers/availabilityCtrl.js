angular.module("skedApp").controller("availabilityCtrl", function($scope){

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