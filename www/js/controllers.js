angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,dateFilter,$location) {
    $scope.day_total = 0; // 24시간 지출 계산
    $scope.month_total = 0; // 30일 지출 계ㅅ
  // Form data for the login modal
  $scope.loginData = {};
  $scope.date = '2013-11-26';
  $scope.minDate = '2013-10-05';
  $scope.maxDate = '2014-12-04';
  $scope.disabledDates = ['2013-11-19', '2013-11-30'];
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/calendar.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.plus = function(plus1){ // 배열로 day값을 넣고 그날 배열의 합만 불러온다.
      var currentNow = new Date();
      $scope.day = currentNow.getDate();
      $scope.total1 += plus1;
      $location.path("/app/search");
  }
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$ionicPopover,$location) {
    var currentNow = new Date();
    $scope.test = currentNow.getFullYear();
    $scope.test1 = currentNow.getMonth() + 1;
    $scope.test2 = currentNow.getDate();
    $scope.test3 = currentNow.getHours();
    $scope.test4 = currentNow.getMinutes();
    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
     }).then(function(popover) {
        $scope.popover = popover;
     });

     $scope.openPopover = function($event) {
        $scope.popover.show($event);
     };

     $scope.closePopover = function() {
        $scope.popover.hide();
     };

     //Cleanup the popover when we're done with it!
     $scope.$on('$destroy', function() {
        $scope.popover.remove();
     });

     // Execute action on hide popover
     $scope.$on('popover.hidden', function() {
        // Execute action
     });

     // Execute action on remove popover
     $scope.$on('popover.removed', function() {
        // Execute action
     });
     
     
  $scope.settingsList = [
    { text: 'Taxi', id: 1 },
    { text: 'Price', id: 2 },
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
