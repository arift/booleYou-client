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

.controller('LoginCtrl', function($scope, LoginService, $state, $timeout, $http) {
  $scope.login = function(user) {
    $scope.data = {}

    if (!user || !user.bitname || !user.password) {
      console.log("Undefined username/password");
      shakeShakeShake();
      return;
    }

    LoginService.loginUser(user.bitname, user.password).success(function(data) {
      console.log("Good, data: " + data);
      $state.go('tab.bitstream');
    }).error(function(data){
      console.log("Error, data: " + data);
      shakeShakeShake();
    });                                                                        

    function shakeShakeShake() {
      //turn red
      $(".invalidText").css("opacity", "1");
      $(".invalidHolder").addClass("invalid");

      //shake!
      var interval = 50;                                                                                                 
      var distance = 10;                                                                                                  
      var times = 4;                                                                                                      

      $(".padding").css('position','relative');                                                                                  

      for(var iter=0;iter<(times+1);iter++){                                                                              
          $(".padding").animate({ 
              left:((iter%2==0 ? distance : distance*-1))
              },interval);                                   
      }                                                                                                             

      $(".padding").animate({ left: 0},interval);  
    }
  };
})

.controller('WelcomeCtrl', function($scope, $state) {
  $scope.welcome = function() {
    $state.go('login');
  };

  $scope.signUp = function() {
    $state.go('signup');
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
  $http.post('http://booleyou-server.herokuapp.com/api/user/users', dataToSend).
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

