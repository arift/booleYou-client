angular.module('starter.controllers', [])

.controller('BitStreamCtrl', function($scope, booleOuts) {
  $scope.posts = booleOuts.all();   // this function returns all the booleOuts stored in our Mongo DB
  $scope.refresh = function() {     // this function is executed when the user drags down the interface to refresh the BitStream
    booleOuts.add(Date.now());      // Clearly, this is simply dummy data for now, but in the future, we will implement a call to the server
    $scope.posts = booleOuts.all();                           // to refresh the BitStream
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.composeBooleOut = function() {
    // this function will display a pop-up interface in which
    // the user will compose a booleOut, complete with a text
    // entry field as well as a radio button for 1 / 0
  }
  $scope.upBoole = function() {
    // upBoole logic
  }
  $scope.downBoole = function() {
    // downBoole logic
  }
  $scope.reBoole = function() {
    // reBoole logic
  }
})

.controller('FollowingCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FollowersCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SignUpCtrl',function($scope, $ionicPopup, $timeout, $http) {

 // Triggered on a button click, or some other target
  $scope.showPopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/signupBirthday.html',
      title: 'Enter Birthday',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-royal',
          onTap: function(e) {
            $('#bdaytext').empty();
            var month = $('#months option:selected').text();
            var day = $('#days option:selected').text();
            var year = $('#years option:selected').text();
            $('#bdaytext').text('Birthday: ' + month + ' ' + day + ', ' + year);
          }
        },
      ]
    });
  };
  $scope.submitForm = function() {
    $scope.data = {}
    // console.log("First name: " + $scope.signup.firstName);
    // console.log("Last Name: " + $scope.signup.lastName);
    // console.log("Email: " + $scope.signup.email);
    // console.log("BitName: " + $scope.signup.bitName);
    // console.log("Pass: " + $scope.signup.password);
    // console.log("Gender: " + $scope.signup.gender);

    var dataToSend = {
      firstName : $scope.signup.firstName,
      lastName  : $scope.signup.lastName,
      email     : $scope.signup.email,
      bitName   : $scope.signup.bitName,
      password  : $scope.signup.password,
      gender    : $scope.signup.gender
    }

  //POST request to the servers api:
  $http.post('http://booleyou-server.herokuapp.com/api/users', dataToSend).
    success(function(data, status, headers, config) {
      if (data.msg === "success") {
        console.log("Success!");
        $scope.serverMessage = "Server reply: " + data.msg;
      }

    }).
    error(function(data, status, headers, config) {
      $scope.serverMessage = "Server reply: " + data.msg;
      console.log("Error!");
    });

  };
});
