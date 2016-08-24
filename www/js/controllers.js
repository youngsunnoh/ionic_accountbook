angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,dateFilter,$location) {
    $scope.day_total = []; // 24시간 지출 계산
    $scope.month_total = 0; // 30일 지출 계산
    
    var currentNow = new Date();
    $scope.year = currentNow.getFullYear();
    $scope.month = currentNow.getMonth() + 1;
    $scope.day = currentNow.getDate();
    $scope.hours = currentNow.getHours();
    $scope.minutes = currentNow.getMinutes();
    
    $scope.$watch('day', function (newValue, oldValue) { //day 스코프 변경되기전 값 변경후 값을 watch로 걸러낼수 있다.
        if (newValue != oldValue)
            $scope.day_total = [];
            console.log($scope.day_total);
        }, true);
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
  $scope.plus = function(price){ // 배열로 day값을 넣고 그날 배열의 합만 불러온다.(카테고리,날짜시간,금액)
      var currentNow = new Date();
      $scope.day = currentNow.getDate();
      var plus_array = {category : 'taxi' , day: $scope.day , price: price}
      $scope.day_total.push(plus_array); //현재날짜 카테고리별로 금액을 배열로 저장한다.
      for(var i = 0; i < $scope.day_total.length; i++){
          if($scope.day_total.day == 24){
              $scope.day_total += $scope.day_total[i].price;
              console.log($scope.day_total);
          }
      }
      
      
      
      console.log($scope.day_total);
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
