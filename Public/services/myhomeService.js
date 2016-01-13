angular.module("skedApp").service("myhomeService", function($http, $q){

	this.getMyOrgs = function(user){
		var dfd = $q.defer();
		$http({
			method: "GET",
			url: "" + user._id,
		}).then(function(res){
			myOrgs = res.data;
			dfd.resolve();
		});
		return dfd.promise;
	};

});