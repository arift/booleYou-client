angular.module('starter.controllers', [])

.controller('BitStreamCtrl', function($scope, $http, booleOuts,ProfileFetch) {
  $scope.postBooleOut = function(bit) {
    $scope.data = {}

    var dataToSend = {
      bit      : bit,
      hashtag  : $scope.bitstream.hashtag.replace(/ /g, "").replace("#", "").split("#"),
      userName     : "exampleid"
//      user     : $scope.userid,
    }

  //POST request to the servers api:
  $http.post('http://booleyou-server.herokuapp.com/api/booleout/booleOuts', dataToSend).
    success(function(data, status, headers, config) {
      if (data.message === "booleOut Added") {
        $scope.serverMessage = "Server reply: " + data.message;
        updateBitStream();
      }
    }).
    error(function(data, status, headers, config) {
      $scope.serverMessage = "Server reply: " + data.message;
    });

  };

  $scope.toProfile = function(user_name) {
    ProfileFetch.setUsername(user_name);
    $state.go('profile');
  }
  // function to update bit stream
  var updateBitStream = function(){
      booleOuts.all(function(result){
          if(result) {
              $scope.posts = result;
              $scope.errorMessage = null;
          }
          else {
              $scope.errorMessage = "Connection error occured";
          }
      });
  };

  updateBitStream();

  // this function returns all the booleOuts stored in our Mongo DB
  $scope.refresh = function() {     // this function is executed when the user drags down the interface to refresh the BitStream
    updateBitStream(); // to refresh the BitStream
    $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.upBoole = function(hashtag) {
    // this function will add a 1 to the hashtag profile
  };
  $scope.downBoole = function(hashtag) {
    // this function will add a 0 to the hashtag profile
  };
  $scope.reply = function(booleOut) {
    // this function will display a posting environment in which to reply to a booleOut
  };
  $scope.getPhoto = function(user_name) {
    // return the user's photo to user on the booleOut list-card
  };
  $scope.getBit = function(boolean) {
      if (boolean == true) {
          return 1;
      }
      return 0;
  }
})

.controller('ProfileCtrl', function($scope, $state, ProfileFetch) {
  console.log("Hello " + ProfileFetch.getUsername());
  var updateProfile = function() {
      ProfileFetch.fetchProfileData(function(result){
          if(result) {
              $scope.profileData = result;
              var year = result.signup_date.substring(0, 4);
              var month = result.signup_date.substring(5, 7);
              var day = result.signup_date.substring(8, 10);
              result.signup_date=[day,month,year];
              $scope.errorMessage = null;
          }
          else {
              $scope.errorMessage = "Connection error occured";
          }
      });
  };

  updateProfile();

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

.controller('SignUpCtrl',function($scope, SignupService, $state, $ionicPopup, $timeout, $http) {

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

    //this should be same as the User schema on the server
    var user = {
      firstName : $scope.signup.firstName,
      lastName  : $scope.signup.lastName,
      email     : $scope.signup.email,
      username   : $scope.signup.bitName,
      password  : $scope.signup.password,
      gender    : $scope.signup.gender
    }

    SignupService.signupUser(user).success(function(data) {
      console.log("(Controller)Good, data: " + data);
      $state.go('login');
    }).error(function(data){
      console.log("(controller)Error, data: " + data);
      //do something else when error happens. Maybe show an error message??
    }); 
};
});
