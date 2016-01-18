angular.module("skedApp").service("orgService", function($http, $q){

	this.getOrgUsers = function(orgID){
		var dfd = $q.defer();
		$http({
			method: "GET",
			url: "/api/org/" + orgID + "/users",
		}).then(function(results){
			dfd.resolve(results.data);
		});
		return dfd.promise;
	};

	this.getOrg = function(orgID){
		var dfd = $q.defer();
		$http({
			method: "GET",
			url: "/api/org/" + orgID,
		}).then(function(results){
			dfd.resolve(results.data);
		});
		return dfd.promise;
	};

	this.updateOrg = function(orgID, updateData){
		var dfd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/org/" + orgID,
			data: updateData
		}).then(function(){
			dfd.resolve();
		});
		return dfd.promise;
	};


});
