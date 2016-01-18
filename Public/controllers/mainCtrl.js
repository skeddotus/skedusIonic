angular.module("skedApp").controller("mainCtrl", function($scope,$timeout, authService, mainService, user){

 
	$scope.user = user;

	$scope.getMyOrgs = function(userID){
		console.log('GETTING ORGS', userID)
		mainService.getMyOrgs(userID).then(function(res){
			$scope.myOrgs = res;
			console.log("got orgs", $scope.myOrgs);
		});
	};
	$scope.getMyOrgs($scope.user._id);

	$scope.getOrgs = function(){
		mainService.getOrgs().then(function(res){
			var orgs = res;
			for(var i = orgs.length - 1; i >= 0 ; i--){
				var members = orgs[i].members;
				for(var j = 0; j < members.length; j++){
					if(members[j].userid === $scope.user._id){
						orgs.splice(i, 1);
					}
				}
			}
			$scope.orgs = orgs;
		})
	}
	$scope.getOrgs();

	$scope.joinOrg = function(orgID){
		mainService.joinOrg($scope.user._id, orgID).then(function(){
			$scope.getMyOrgs($scope.user._id);
			$scope.getOrgs();
			console.log("organization joined");
		})
	};

	$scope.leaveOrg = function(orgID){
		mainService.leaveOrg($scope.user._id, orgID).then(function(){
			$scope.getMyOrgs($scope.user._id);
			console.log("no longer member or org :(");
		})
	};

	$scope.createOrg = function(newOrg){
		console.log('Hello!')
		mainService.createOrg(newOrg, $scope.user._id).then(function(){
			console.log("userID: ", $scope.user._id);
			$scope.newOrg = "";
			//console.log("myOrgs", $scope.myOrgs);
			//var myFunction = function() {};
			$scope.getMyOrgs($scope.user._id);
			// debugger;
		});
		console.log('World!')
	};

	$scope.getMyMenteeBookedApts = function(userID){
		mainService.getMyMenteeBookedApts(userID).then(function(results){
			$scope.myMenteeBookedApts = results;
		});
	};
	$scope.getMyMenteeBookedApts($scope.user._id);

	$scope.cancelApt = function(aptID){
		mainService.cancelApt(aptID).then(function(){
			$scope.getMyMenteeBookedApts($scope.user._id);
		});
	};


	$scope.logout = function() {
		authService.logout();
	};


});
