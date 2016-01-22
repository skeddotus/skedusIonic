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

	this.getOrgApts = function(orgID){
		var dfd = $q.defer();
		$http({
			method: "GET",
			url: "/api/apt/" + orgID,
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
		}).then(function(res){
			dfd.resolve(res.data);
		});
		return dfd.promise;
	};

	this.deactivateOrg = function(orgID){
		var dfd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/org/" + orgID,
			data: {
				status: "Archived"
			}
		}).then(function(){
			dfd.resolve();
		});
		return dfd.promise;
	};

	this.reactivateOrg = function(orgID){
		var dfd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/org/" + orgID,
			data: {
				status: "Active"
			}
		}).then(function(){
			dfd.resolve();
		});
		return dfd.promise;
	};

	this.makeAdmin = function(userID, orgID){
		var dfd = $q.defer();
		$http({
			method: "POST",
			url: "/api/org/" + orgID + "/admins",
			data: {
				role: "Admin",
				userid: userID,
			}
		}).then(function(){
			dfd.resolve();
		});
		return dfd.promise;
	};

	this.makeMentor = function(userID, orgID){
		var dfd = $q.defer();
		$http({
			method: "POST",
			url: "/api/org/" + orgID + "/mentors",
			data: {
				role: "Mentor",
				userid: userID,
			}
		}).then(function(){
			dfd.resolve();
		});
		return dfd.promise;
	};

	this.makeUser = function(userID, orgID){
		var dfd = $q.defer();
		$http({
			method: "POST",
			url: "/api/org/" + orgID + "/user",
			data: {
				role: "User",
				userid: userID,
			}
		}).then(function(){
			dfd.resolve();
		});
		return dfd.promise;
	};

	this.removeUser = function(userID, orgID){
		var dfd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/org/" + orgID + "/users",
			data: {userid: userID}
		}).then(function(){
			dfd.resolve();
		});
		return dfd.promise;
	}


});
