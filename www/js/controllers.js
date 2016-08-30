angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,dateFilter,$location,$cordovaSQLite) {
    $scope.day_list = []; 
    $scope.month_list = [{id: 1, src: "http://placehold.it/50x50"},
                         {id: 2, src: "http://placehold.it/50x50"},
                         {id: 3, src: "http://placehold.it/50x50"},
                         {id: 4, src: "http://placehold.it/50x50"},
                         {id: 5, src: "http://placehold.it/50x50"},
                         {id: 6, src: "http://placehold.it/50x50"},
                         {id: 7, src: "http://placehold.it/50x50"},
                         {id: 8, src: "http://placehold.it/50x50"},
                         {id: 9, src: "http://placehold.it/50x50"},
                         {id: 10, src: "http://placehold.it/50x50"},
                         {id: 11, src: "http://placehold.it/50x50"},
                         {id: 12, src: "http://placehold.it/50x50"}];
    var currentNow = new Date();
    $scope.year = currentNow.getFullYear();
    $scope.month = ("0" + (currentNow.getMonth() + 1)).slice(-2);
    $scope.day = ("0" + currentNow.getDate()).slice(-2);
    $scope.hours = currentNow.getHours();
    $scope.minutes = currentNow.getMinutes();
    
    //지출리스트
    $scope.expenditureList = [ 
                           { text: '택시', id: 1 },
                           { text: '식비', id: 2 },
                           { text: '버스', id: 3 },
                           { text: '커피', id: 4 },
                           { text: '직접입력', id: 5 }
                         ];
    //수입리스트
    $scope.incomeList = [ 
                           { text: '용돈', id: 1 },
                           { text: '월급', id: 2 },
                           { text: '팁', id: 3 },
                           { text: '적금', id: 4 },
                           { text: '직접입력', id: 5 }
                         ];
    
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

  // 모달 닫기
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  
  // 모달 열기
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
              $scope.day_list.push({category: res.rows[i].category, 
                                  price : res.rows[i].price,
                                  date : res.rows[i].date})
          }
          console.log($scope.day_list);
      }, function (err) {
          console.error(err);
      });
      $location.path("/app/day");
      
      
     /* for(var i = 0; i < $scope.day_total_array.length; i++){
          if($scope.day_total_array[i].day == 25){
              $scope.day_total += $scope.day_total_array[i].price;
          }
      }*/
  }
  $scope.day_list_query = function(){
      var query = "SELECT * FROM kake";
      $cordovaSQLite.execute(db, query).then(function(res) {
          var len = res.rows.length;
          for (var i = 0; i< len ; ++i){
              $scope.day_list.push({category: res.rows[i].category, 
                                  price : res.rows[i].price,
                                  date : res.rows[i].date})
          }
          console.log($scope.day_list);
      }, function (err) {
          console.error(err);
      });
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

.controller('PlaylistsCtrl', function($scope,$ionicPopover,$location,$cordovaSQLite) {
    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
     }).then(function(popover) {
        $scope.popover = popover;
     });

     $scope.openPopover = function($event,type) {
        if(type == '1'){
            $scope.type = 1;
        } else {
            $scope.type = 2;
        }
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
