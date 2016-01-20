angular.module("skedApp").controller("mainCtrl", function($scope, $timeout, authService, mainService, user){

  //------------jQuery Stuff-------------------
$(document).ready(function(){

  // auto close sidebar when select an item
  // $('.menuItemSelected').click(function(event) {
  //   console.log('I ran');
  //   $('#navSidebar').offcanvas("hide");
  // });

});
// ------------------------------------------

	$scope.calendarLoaded = false;
	$scope.notLoaded = true;

	//Page title
	$scope.pageTitle = "Schedule";

	$scope.user = user;

	$scope.getMyOrgs = function(userID){
		mainService.getMyOrgs(userID).then(function(res){
			$scope.myOrgs = res;
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
		mainService.createOrg(newOrg, $scope.user._id).then(function(){
			$scope.getMyOrgs($scope.user._id);
			$scope.newOrg = "";
		});
	};

	$scope.getMyMenteeBookedApts = function(userID){
		mainService.getMyMenteeBookedApts(userID).then(function(results){
			$scope.myMenteeBookedApts = results;
		});
	};
	$scope.getMyMenteeBookedApts($scope.user._id);


	$scope.cancelApt = function(aptID){
		swal({
			title: "Are you sure you want to Cancel Appointment?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes",
			cancelButtonText: "No, I want to keep it!",
		}, function(isConfirm){
			if(isConfirm){
				mainService.cancelApt(aptID).then(function(){
					$scope.getMyMenteeBookedApts($scope.user._id);
				});
			};
		});
	};


	$scope.logout = function() {
		authService.logout();
	};


});
