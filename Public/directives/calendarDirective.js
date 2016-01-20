angular.module('skedApp').directive('calendarDirective', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: '/templates/calendarDirective.html',
    link: function(scope, elem, attrs) {
      $timeout(function() {
        scope.notLoaded = false;
        scope.calendarLoaded = true;
      });
    },
    controller: function($scope) {

      $scope.calendarView = 'month';
      $scope.viewDate = new Date();

      // $scope.events = [
      // {
      //   title: 'My event title', // The title of the event
      //   type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
      //   startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
      //   endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
      //   editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
      //   deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
      //   draggable: true, //Allow an event to be dragged and dropped
      //   resizable: true, //Allow an event to be resizable
      //   incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
      //   recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
      //   cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
      // }];

      $scope.events = [
          {
            title: 'An event',
            type: 'warning',
            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            draggable: true,
            resizable: true
          },
          {
            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
            type: 'info',
            startsAt: moment().subtract(1, 'day').toDate(),
            endsAt: moment().add(5, 'days').toDate(),
            draggable: true,
            resizable: true
          },
          {
            title: 'This is a really long event title that occurs on every year',
            type: 'important',
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            recursOn: 'year',
            draggable: true,
            resizable: true
          }
        ];

      $scope.isCellOpen = false;

      $scope.eventClicked = function(event) {
        swal({
          title: 'Clicked',
          text: event
        });
      };

      $scope.eventEdited = function(event) {
        swal({
          title: 'Edited',
          text: event
        });
      };

      $scope.eventDeleted = function(event) {
        swal({
          title: 'Deleted',
          text: event
        });
      };

      $scope.eventTimesChanged = function(event) {
        swal({
          title: 'Dropped or Resized',
          text: event
        });
      };

      $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
      };

    }
  };
});
