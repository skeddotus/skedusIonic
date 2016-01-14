angular.module("skedApp").service("orgService", function($http, $q){

	this.getOrgs = function(){
		var dfd = $q.defer()
		$http({
			method: "GET",
			url: "/api/orgs",
		}).then(function(res){
			orgs = res.data;
			dfd.resolve(orgs);
		})
		return dfd.promise;
	}

	this.getMyOrgs = function(user){
		var dfd = $q.defer();
		$http({
			method: "GET",
			url: "/api/user/" + user._id,
		}).then(function(res){
			myOrgs = res.data.orgs;
			console.log("myOrgs: ", myOrgs)
			dfd.resolve(myOrgs);
		});
		return dfd.promise;
	};

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

	this.createOrg = function(newOrg, user){
		var dfd = $q.defer();
		$http({
			method: "POST",
			url: "/api/orgs/" + user._id,
			data: {
				name: newOrg.name,
				desc: newOrg.desc,
				location: newOrg.add1 + " " + newOrg.add2 + " " + newOrg.city  + ", " + newOrg.st  + " " + newOrg.zip,
			}
		}).then(function(){
			console.log("org added")
			dfd.resolve();
		})
		return dfd.promise;
	};

});