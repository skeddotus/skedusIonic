angular.module("skedApp").service("createService", function($http, $q){

	this.createOrg = function(newOrg){
		var dfd = $q.defer();
		$http({
			method: "POST",
			url: "/api/orgs",
			data: {
				name: newOrg.name,
				location: newOrg.add1 + " " + newOrg.add2 + " " + newOrg.city  + ", " + newOrg.st  + " " + newOrg.zip,
				desc: newOrg.desc
			}
		}).then(function(){
			dfd.resolve();
		})
		return dfd.promise;
	};

});