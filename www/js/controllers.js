angular.module('starter.controllers', [])

.controller('BitStreamCtrl', function($scope, $rootScope, $http, $state, booleOuts,ProfileFetch, $ionicPopup) {
  $scope.postBooleOut = function(bit) {
    $scope.data = {};

    var dataToSend = {
      bit      : bit,
      hashtag  : $scope.bitstream.hashtag.replace(/ /g, "").replace("#", "").split("#"),
      username     : $rootScope.user.username
    };
    booleOuts.postBooleOut(dataToSend, function (data) {
      updateBitStream();
    });
  };

  $scope.toProfile = function(username) {
    $state.go('profile', {username : username});    
  }
  // function to update bit stream
  var updateBitStream = function() {
    booleOuts.getParents(function(result){
      if(result) {
        $scope.posts = result;
        $scope.replyShow = [];

        var booleOut;
        for(booleOut in result){
            $scope.replyShow[result[booleOut]._id] = false;
        };
      }
    });

  };

  updateBitStream();

  // this function returns all the booleOuts stored in our Mongo DB
  $scope.refresh = function() {     // this function is executed when the user drags down the interface to refresh the BitStream
    updateBitStream(); // to refresh the BitStream
    $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.upBoole = function(btn, booleOut) {
    // this function will add a 1 to the hashtag profile
  };
  $scope.downBoole = function(btn, booleOut) {
    // this function will add a 0 to the hashtag profile
  };
  var flag = true;


  $scope.reply = function(parentId) {
    // this function will display a posting environment in which to reply to a booleOut
     if(!flag) {
       $('.buttonDown').removeClass('ion-chevron-up').addClass('ion-chevron-down');
       flag = true;
      }
      else{
        $('.buttonDown').removeClass('ion-chevron-down').addClass('ion-chevron-up');
        flag = false;
      }
    booleOuts.getReplies(parentId, function(result){
      if(result) {
        if(!$scope.allReplies)
          $scope.allReplies = [];
        $scope.allReplies[parentId] = result;
      }
     
      
    });
  };

  $scope.changeUp = function() {
    
  }

  $scope.changeDown = function() {
  }
  $scope.getPhoto = function(user_name) {
    // return the user's photo to user on the booleOut list-card
  };
  $scope.getBit = function(boolean) {
    if (boolean == true) {
      return 1;
    }
    return 0;
  };
  $scope.getHashtags = function(hashtag) {
    var tags = "";
    hashtag.forEach(function(entry) {
      tags += "#" + entry + " ";
    });
    return tags;
  };

  $scope.replyPopup = function(parentId) {
    $scope.data = {}

    var popup = $ionicPopup.show({
      template: '<input ng-model="reply.hashtag" type = "text">',
      title: 'Enter Reply',
      scope: $scope,
      buttons: [
      {
        text: '<b>1</b>',
        type: 'button-royal',
        onTap: function() {
          var dataToSend = {
            bit      : 1,
            hashtag  : $scope.reply.hashtag.replace(/ /g, "").replace("#", "").split("#"),
            username : $rootScope.user.username,
            parent   : parentId
          };
          booleOuts.postReply(dataToSend, function (data) {
           booleOuts.getReplies(parentId, function(result){
            if(result) {
              if(!$scope.allReplies)
                $scope.allReplies = [];
              $scope.allReplies[parentId] = result;
            }
          });
         });
        }
      },
      {
        text: '<b>0</b>',
        type: 'button-royal',
        onTap: function() {
         var dataToSend = {
          bit      : 0,
          hashtag  : $scope.reply.hashtag.replace(/ /g, "").replace("#", "").split("#"),
          username : $rootScope.user.username,
          parent   : parentId
        };
        booleOuts.postReply(dataToSend, function (data) {
         booleOuts.getReplies(parentId, function(result){
          if(result) {
            if(!$scope.allReplies)
              $scope.allReplies = [];
            $scope.allReplies[parentId] = result;
          }
        });
       });
      }
    },
    { text: 'Exit' }
    ]
  });
}
})

.controller('ProfileCtrl', function($scope, $state, $stateParams, ProfileFetch) {

  var updateProfile = function() {
    ProfileFetch.fetchProfileData($stateParams.username, function(result){
      if(result) {
        $scope.profileData = result;
        var year = result.signup_date.substring(0, 4);
        var month = result.signup_date.substring(5, 7);
        var day = result.signup_date.substring(8, 10);
        result.signup_date=[day,month,year];
      }
    });
  };

  updateProfile();

  $scope.goBack = function() {
    $state.go('tab.bitstream');
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

.controller('FriendDetailCtrl', function($scope, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, $rootScope) {
 var updateProfile = function() {
  $scope.profileData = $rootScope.user;
  var year = $rootScope.user.signup_date.substring(0, 4);
  var month = $rootScope.user.signup_date.substring(5, 7);
  var day = $rootScope.user.signup_date.substring(8, 10);
  $rootScope.user.signup_date=[day,month,year];
};

updateProfile();
})


.controller('LoginCtrl', function($scope, $rootScope, LoginService, $state, $timeout, $http) {
  $scope.login = function(user) {
    $scope.data = {}

    if (!user || !user.bitname || !user.password) {
      shakeShakeShake();
      return;
    }

    LoginService.loginUser(user.bitname, user.password).success(function(data) {
      $rootScope.user = data;
      $state.go('tab.bitstream');
    }).error(function(data){
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
      $state.go('login');
    }).error(function(data){
      //do something else when error happens. Maybe show an error message??
    }); 
  };
});
