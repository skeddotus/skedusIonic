angular.module("skedApp").service("leaveService", function($http, $q){

	this.leaveOrg = function(user, org){
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

});