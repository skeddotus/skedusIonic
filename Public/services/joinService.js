angular.module("skedApp").service("joinService", function($http, $q){

	this.joinOrg = function(user, org){
		var dfd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/users/" + user._id,
			data: org._id
		}).then(function(){
			dfd.resolve();
		})
		return dfd.promise;
	};

	this.getOrgs = function(){
		var dfd = $q.defer()
		$http({
			method: "GET",
			url: "/api/orgs",
		}).then(function(res){
			orgs = res.data;
			dfd.resolve();
		})
		return dfd.promise;
	}

});