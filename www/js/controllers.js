angular.module('starter.controllers', [])

.controller('BitStreamCtrl', function($scope) {})

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

.controller('SignUpCtrl',function($scope, $ionicPopup, $timeout) {

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

    console.log("First name: " + $scope.signup.firstName);
    console.log("Last Name: " + $scope.signup.lastName);
    console.log("Email: " + $scope.signup.email);
    console.log("BitName: " + $scope.signup.bitName);
    console.log("Pass: " + $scope.signup.password);
    console.log("Gender: " + $scope.signup.gender);

    // Simple POST request example (passing data) :
  $http.post('booleyou-server.herokuapp.com/users', {msg:'hello word!'}).
    success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    }).
    error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });

    // // An elaborate, custom popup
    // var myPopup = $ionicPopup.show({
    //   templateUrl: 'templates/signupBirthday.html',
    //   title: 'Enter Birthday',
    //   scope: $scope,
    //   buttons: [
    //     { text: 'Cancel' },
    //     {
    //       text: '<b>Save</b>',
    //       type: 'button-royal',
    //       onTap: function(e) {
    //         $('#bdaytext').empty();
    //         var month = $('#months option:selected').text();
    //         var day = $('#days option:selected').text();
    //         var year = $('#years option:selected').text();
    //         $('#bdaytext').text('Birthday: ' + month + ' ' + day + ', ' + year);           
    //       }
    //     },
    //   ]
    // });
  };  
});

