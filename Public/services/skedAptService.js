angular.module("skedApp").service("skedAptService", function($http, $q){

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

	this.getOrg = function(orgID){
		var dfd = $q.defer();
		$http({
			method: "GET",
			url: "/api/org/" + orgID,
		}).then(function(result){
			dfd.resolve(result.data);	
		});
		return dfd.promise;
	};

	this.skedApt = function(aptID, userID){
		var dfd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/apt/" + aptID,
			data: {
				mentee: userID,
				status: "booked",
			}
		}).then(function(){
			dfd.resolve();
		})
		return dfd.promise;
	};

});