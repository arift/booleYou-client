angular.module('starter.controllers', [])

.controller('BitStreamCtrl', function($scope, $http) {
  $scope.postBooleOut = function(bit) {
    console.log("clicked " + bit);
    $scope.data = {}
    // console.log("Bit: " + 1or0);
    // console.log("Hashtag: " + $scope.bitstream.hashtag);
    // console.log("User: " + "exampleid");

    var dataToSend = {
      bit      : bit,
      hashtag  : $scope.bitstream.hashtag.replace(/ /g, "").replace("#", "").split("#"),
      user     : "exampleid"
//      user     : $scope.userid,
    }

  //POST request to the servers api:
  $http.post('http://localhost:3000/api/booleOuts', dataToSend).
    success(function(data, status, headers, config) {
      console.log("Data: " + data.message);
      if (data.message === "booleOut Added") {
        console.log("Success!");
        $scope.serverMessage = "Server reply: " + data.message;
      }
      
    }).
    error(function(data, status, headers, config) {
      $scope.serverMessage = "Server reply: " + data.message;
      console.log("Error!");
    });

  };
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

