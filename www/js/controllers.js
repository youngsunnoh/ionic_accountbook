angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,dateFilter,$location,$cordovaSQLite) {
    $scope.select = []; 
    var currentNow = new Date();
    $scope.year = currentNow.getFullYear();
    $scope.month = ("0" + (currentNow.getMonth() + 1)).slice(-2);
    $scope.day = ("0" + currentNow.getDate()).slice(-2);
    $scope.hours = currentNow.getHours();
    $scope.minutes = currentNow.getMinutes();
    
    $scope.settingsList = [
                           { text: 'Taxi', id: 1 },
                           { text: 'Sic', id: 2 },
                           { text: 'Bus', id: 3 },
                           { text: 'Caffe', id: 4 },
                           { text: '직접입력', id: 5 }
                         ];
    /*$scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }
 
    $scope.select = function(lastname) {
        var query = "SELECT * FROM people";
        $cordovaSQLite.execute(db, query).then(function(res) {
            console.log(res);
        }, function (err) {
            console.error(err);
        });
    }*/
  
    
  //캘린더 옵션
  $scope.loginData = {};
  $scope.date = $scope.year+"-"+$scope.month+"-"+$scope.day;
  $scope.minDate = $scope.year+"-01-01";
  $scope.maxDate = $scope.year+"-12-31";
  /*$scope.disabledDates = ['2013-11-19', '2013-11-30'];*/
  
  
  //캘린더 모달
  $ionicModal.fromTemplateUrl('templates/calendar.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.calender_day = function(date){
        console.log(date); //일별지출내용쿼리들어갈곳
    }
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
      var res = $scope.year+"-"+$scope.month+"-"+$scope.day;
      /*var plus_array = {category : $scope.category , day: res , price: price}*/
      /*$scope.day_total_array.push(plus_array); //현재날짜 카테고리별로 금액을 배열로 저장한다.
*/      /*console.log($scope.day_total_array);*/
      
      /*$scope.$watch('day', function (newValue, oldValue) { //day 스코프 변경되기전 값 변경후 값을 watch로 걸러낼수 있다.
          if (newValue != oldValue)
              $scope.day_total = 0;
          }, true);
      $scope.$watch('month', function (newValue, oldValue) { //month 스코프 변경되기전 값 변경후 값을 watch로 걸러낼수 있다.
          if (newValue != oldValue)
              $scope.month_total = 0;
          }, true);*/
      
      var query = "INSERT INTO kake (category, price, date) VALUES (?,?,?)";
      $cordovaSQLite.execute(db, query, [$scope.category, price, res]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
          console.error(err);
      });
      
      var query = "SELECT * FROM kake";
      $cordovaSQLite.execute(db, query).then(function(res) {
          var len = res.rows.length;
          for (var i = 0; i< len ; ++i){
              $scope.select.push({category: res.rows[i].category, 
                                  price : res.rows[i].price,
                                  date : res.rows[i].date})
          }
          console.log($scope.select);
      }, function (err) {
          console.error(err);
      });
      $location.path("/app/search");
      
      
     /* for(var i = 0; i < $scope.day_total_array.length; i++){
          if($scope.day_total_array[i].day == 25){
              $scope.day_total += $scope.day_total_array[i].price;
          }
      }*/
  }
  $scope.checkbox = function(category) {
      if(category.text == '직접입력'){ // popover html 컨트롤
          $scope.inputshow = 1;
          $scope.category = category.text;
      } else {
          $scope.inputshow = 0;
          $scope.category = category.text;
      }
  };
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
    $scope.data = {
            clientSide: 'ng'
          };
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
     
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
