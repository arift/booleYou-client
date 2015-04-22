angular.module('starter.controllers', [])


.controller('BitStreamCtrl', function($scope, $rootScope, $http, $state, booleOuts, UserService, $ionicPopup, $ionicModal, HashtagService) {
  $scope.showChart = function(booleOut) {
    HashtagService.getbyhashtag(booleOut.hashtag[0], function(result) {
    if(result){
      var scope = angular.element($("#dataVisual")).scope();
      scope.hashtag = result;


      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/pieChart.html',
        scope: $scope,
        buttons: [
      { text: 'Close' }
      ]
      });

    }
  })

  };

  $scope.postBooleOut = function(bit) {
    $scope.data = {};
    $scope.type = 'global';

    var dataToSend = {
      bit      : bit,
      hashtag  : booleOuts.parseBooleOut($scope.bitstream.hashtag),
      username : $rootScope.user.username
    };
    $scope.bitstream.hashtag = "";
    booleOuts.postBooleOut(dataToSend, function (data) {
      updateBitStream('this');
    });
  };

  $scope.toProfile = function(username) {
    $state.go('profile', {username : username});
  };
  // function to update bit stream
      var updateBitStream = function(type) {
          if (type === 'this') {
              if ($scope.type === 'global' || $scope.type == null) {
                  booleOuts.getParents(function(result) {
                      if(result) {
                          $scope.posts = result;
                          $scope.replyShow = [];

                          var booleOut;
                          for(booleOut in result) {
                              $scope.replyShow[result[booleOut]._id] = false;
                          }
                      }
                  });
              }
              if ($scope.type === 'personal') {
                  booleOuts.getFollowingParents(function(result) {
                      if(result) {
                          $scope.posts = result;
                          $scope.replyShow = [];

                          var booleOut;
                          for(booleOut in result) {
                              $scope.replyShow[result[booleOut]._id] = false;
                          }
                      }
                  }, rootScope.user.username);
              }
          }
          if (type === 'global') {
              $scope.posts = {};
              booleOuts.getParents(function(result) {
                  if(result) {
                      $scope.posts = result;
                      $scope.replyShow = [];

                      var booleOut;
                      for(booleOut in result) {
                          $scope.replyShow[result[booleOut]._id] = false;
                      }
                  }
              });
          }
          if (type === 'personal') {
              $scope.posts = {};
              booleOuts.getFollowingParents(function(result) {
                  if(result) {
                      $scope.posts = result;
                      $scope.replyShow = [];

                      var booleOut;
                      for(booleOut in result) {
                          $scope.replyShow[result[booleOut]._id] = false;
                      }
                  }
              }, $rootScope.user.username);
          }
      };

  updateBitStream('this');

  // this function returns all the booleOuts stored in our Mongo DB
  $scope.refresh = function(type) { // this function is executed when the user drags down the interface to refresh the BitStream
    updateBitStream(type); // to refresh the BitStream
    $scope.$broadcast('scroll.refreshComplete');
  };

  var flag = true;

  $scope.reply = function(parentId)  {    
    // this function will display a posting environment in which to reply to a booleOut
    if(!flag) {
      $('.buttonDown' + parentId).removeClass('ion-chevron-up').addClass('ion-chevron-down');
      flag = true;
    }
    else{
      $('.buttonDown' + parentId).removeClass('ion-chevron-down').addClass('ion-chevron-up');
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
        if(entry.trim() != "") {
          tags += "#" + entry + " ";
        }
      });
      return tags;
    };

    $scope.replyPopup = function(parentId) {
      $scope.data = {};

      var popup = $ionicPopup.show({
        template: '<input ng-model="reply.hashtag" type = "text">',
        title: 'Enter Reply',
        scope: $scope,
        buttons: [
        {
          text: '<b>1</b>',
          type: 'button-royal',
          onTap: function() {
            if(!$scope.reply.hashtag) {
              $scope.reply.hashtag = "";
            }
            var dataToSend = {
              bit      : 1,
              hashtag  : booleOuts.parseBooleOut($scope.reply.hashtag),
              username : $rootScope.user.username,
              parent   : parentId
            };
            $scope.reply.hashtag = "";
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
           if(!$scope.reply.hashtag) {
            $scope.reply.hashtag = "";
          }
          var dataToSend = {
            bit      : 0,
            hashtag  : booleOuts.parseBooleOut($scope.reply.hashtag),
            username : $rootScope.user.username,
            parent   : parentId
          };
          $scope.reply.hashtag = "";
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

.controller('ProfileCtrl', function($scope, $state, $stateParams, UserService, $rootScope, booleOuts, $ionicPopup, HashtagService) {
  $scope.showChart = function(booleOut) {
    console.log(booleOut);
    HashtagService.getbyhashtag(booleOut.hashtag[0], function(result) {
    if(result){
      var scope = angular.element($("#dataVisual")).scope();
      console.log(result);
      scope.hashtag = result;


      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/pieChart.html',
        scope: $scope,
        buttons: [
      { text: 'Close' }
      ]
      });

    }
  })

  };
  var updateProfile = function() {
    UserService.fetchProfileData($stateParams.username, function(result){
      if(result) {
        $scope.profileData = result;
        var year = result.signup_date.substring(0, 4);
        var month = result.signup_date.substring(5, 7);
        var day = result.signup_date.substring(8, 10);
        result.signup_date=[day,month,year];
        //checks to see if you're looking at your own profile
        if ($stateParams.username === $rootScope.user.username) {
          $(".followButton").hide(); //hides follow button if looking at your own profile
        }
        else {
          UserService.isFollowing($stateParams.username, $rootScope.user.username, function(isFollowing, user) {
            if (isFollowing) {
              $(".followButton").html('Unfollow');
            }
            else {
              $(".followButton").html('Follow');
            }
          });
        }
      }
    });
  };
  updateProfile();

  $scope.goBack = function() {
    $state.go('tab.bitstream');
  };

  $scope.follow = function() {
    UserService.isFollowing($stateParams.username, $rootScope.user.username, function(isFollowing) {
      if (isFollowing) {
        UserService.removeFollowing($stateParams.username, $rootScope.user, function(data) {
          if (typeof data.user !== 'undefined') $rootScope.user = data.user;
          updateProfile();
        });
      }
      else {
        UserService.addFollowing($stateParams.username, $rootScope.user, function(data) {
          if (typeof data.user !== 'undefined') $rootScope.user = data.user;
          updateProfile();
        });
      }
    });
  };

  // function to update bit stream
  var updateBitStream = function() {
    booleOuts.getByUser($stateParams.username, function(result){
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

  $scope.goBack = function() {
    $state.go('tab.bitstream');
  };

  $scope.refresh = function() {     // this function is executed when the user drags down the interface to refresh the BitStream
    updateBitStream(); // to refresh the BitStream
    updateProfile(); // to refresh the User data
    $scope.$broadcast('scroll.refreshComplete');
  };

  var flag = true;
  $scope.reply = function(parentId)  {
    // this function will display a posting environment in which to reply to a booleOut
    if(!flag) {
      $('.buttonDown' + parentId).removeClass('ion-chevron-up').addClass('ion-chevron-down');
      flag = true;
    }
    else{
      $('.buttonDown' + parentId).removeClass('ion-chevron-down').addClass('ion-chevron-up');
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
      if(entry.trim() != "") {
        tags += "#" + entry + " ";
      }
    });
    return tags;
  };

  $scope.replyPopup = function(parentId) {
    $scope.data = {};

    var popup = $ionicPopup.show({
      template: '<input ng-model="reply.hashtag" type = "text">',
      title: 'Enter Reply',
      scope: $scope,
      buttons: [
      {
        text: '<b>1</b>',
        type: 'button-royal',
        onTap: function() {
          if(!$scope.reply.hashtag) {
            $scope.reply.hashtag = "";
          }
          var dataToSend = {
            bit      : 1,
            hashtag  : booleOuts.parseBooleOut($scope.reply.hashtag),
            username : $rootScope.user.username,
            parent   : parentId
          };
          $scope.reply.hashtag = "";
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
          if(!$scope.reply.hashtag) {
            $scope.reply.hashtag = "";
          }
          var dataToSend = {
            bit      : 0,
            hashtag  : booleOuts.parseBooleOut($scope.reply.hashtag),
            username : $rootScope.user.username,
            parent   : parentId
          };
          $scope.reply.hashtag = "";
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

.controller('AccountCtrl', function($scope, $rootScope, booleOuts, $ionicPopup, HashtagService) {
  $scope.showChart = function(booleOut) {
    HashtagService.getbyhashtag(booleOut.hashtag[0], function(result) {
    if(result){
      var scope = angular.element($("#dataVisual")).scope();
      console.log(result);
      scope.hashtag = result;


      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/pieChart.html',
        scope: $scope,
        buttons: [
      { text: 'Close' }
      ]
      });

    }
  })

  };


  var updateProfile = function() {
    $scope.profileData = $rootScope.user;
    var year = $rootScope.user.signup_date.substring(0, 4);
    var month = $rootScope.user.signup_date.substring(5, 7);
    var day = $rootScope.user.signup_date.substring(8, 10);
    $rootScope.user.signup_date=[day,month,year];
  };

  updateProfile();

  // function to update bit stream
  var updateBitStream = function() {
    booleOuts.getByUser($rootScope.user.username, function(result){
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
/* This function has temporarily been commented out as it causes TypeError
  $scope.refresh = function() {     // this function is executed when the user drags down the interface to refresh the BitStream
    updateBitStream(); // to refresh the BitStream
    updateProfile(); // to refresh the User data
    $scope.$broadcast('scroll.refreshComplete');
  };
*/
  var flag = true;
  $scope.reply = function(parentId)  {
    // this function will display a posting environment in which to reply to a booleOut
    if(!flag) {
      $('.buttonDown' + parentId).removeClass('ion-chevron-up').addClass('ion-chevron-down');
      flag = true;
    }
    else{
      $('.buttonDown' + parentId).removeClass('ion-chevron-down').addClass('ion-chevron-up');
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
      if(entry.trim() != "") {
        tags += "#" + entry + " ";
      }
    });
    return tags;
  };

  $scope.replyPopup = function(parentId) {
    $scope.data = {};

    var popup = $ionicPopup.show({
      template: '<input ng-model="reply.hashtag" type = "text">',
      title: 'Enter Reply',
      scope: $scope,
      buttons: [
      {
        text: '<b>1</b>',
        type: 'button-royal',
        onTap: function() {
          if(!$scope.reply.hashtag) {
            $scope.reply.hashtag = "";
          }
          var dataToSend = {
            bit      : 1,
            hashtag  : booleOuts.parseBooleOut($scope.reply.hashtag),
            username : $rootScope.user.username,
            parent   : parentId
          };
          $scope.reply.hashtag = "";
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
          if(!$scope.reply.hashtag) {
            $scope.reply.hashtag = "";
          }
          var dataToSend = {
            bit      : 0,
            hashtag  : booleOuts.parseBooleOut($scope.reply.hashtag),
            username : $rootScope.user.username,
            parent   : parentId
          };
          $scope.reply.hashtag = "";
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


.controller('LoginCtrl', function($scope, $rootScope, LoginService, $state, $timeout, $http) {
  $scope.login = function(user) {
    $scope.data = {};
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
      $('.changeRed').css("color","red");
      //$(".invalidHolder").addClass("invalid");

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

.controller('SettingsCtrl', function($scope, $state, $stateParams, SettingsService) {
  $(".hideMe").hide();
  var oldUserName = $scope.user.username;
  $scope.changeUsername = function(user) {
    SettingsService.changeUserName(oldUserName, user);
  };

  $scope.changePassword = function(placer) {
    SettingsService.changePassword($scope.user, placer.password);
  };

  $scope.compareTo = function(password, confirmPassword) {
    if(password === confirmPassword) {
      $('.confirmTextSettings').text("Passwords Match");
      $('.confirmTextSettings').css("color","green");
    }

    else {
      $('.confirmText').text("Passwords Do Not Match");
      $('.confirmTextSettings').css("color","red");
    }
  };

  $scope.showConfirm = function() {
    $(".removeMe").hide();
    $(".hideMe").show();
  };
})

.controller('imageController', function($scope, $cordovaCamera, $cordovaFile) {
  $scope.images = [];
  
  $scope.addImage = function() {
  // 2
  var options = {
    destinationType : Camera.DestinationType.FILE_URI,
    sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
    allowEdit : false,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions
  };
  
  // 3
  $cordovaCamera.getPicture(options).then(function(imageData) {
   
    // 4
    onImageSuccess(imageData);
    
    function onImageSuccess(fileURI) {
      createFileEntry(fileURI);
    }
    
    function createFileEntry(fileURI) {
      window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
    }
    
    // 5
    function copyFile(fileEntry) {
      var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
      var newName = makeid() + name;
      
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
        fileEntry.copyTo(
          fileSystem2,
          newName,
          onCopySuccess,
          fail
          );
      },
      fail);
    }
    
    // 6
    function onCopySuccess(entry) {
      $scope.$apply(function () {
        $scope.images.push(entry.nativeURL);
        $scope.showImages();
      });
    }
    
    function fail(error) {
      console.log("fail: " + error.code);
    }
    
    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
      for (var i=0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
    
  }, function(err) {
    console.log(err);
  });
}

$scope.urlForImage = function(imageName) {
  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;
}

$scope.getString = function(image) {
  var myImage = document.getElementById('myimage');
  var myCanvas = document.getElementById('mycanvas');
  var ctx = myCanvas.getContext('2d');
  ctx.drawImage(myImage, 0, 0);

  var mydataURL = myCanvas.toDataURL('image/jpg');
  return mydataURL;
}
})

.controller('TrendingCtrl', function($scope, $state, TrendingService, $ionicPopup, HashtagService) {

    var initializeTrending = function() {
        $scope.tag = "Popular";
        $scope.showall = true;
        TrendingService.getTrending(function (result) {
            if (result) {
                var Hashtag = result;
                $scope.Hashtag = Hashtag;

            }
        })
    };

    var discover = function(hashtag){
        $scope.showall = false;
        HashtagService.getbooleouts(hashtag, function(result){
            if(result){
                if(!$scope.posts)
                    $scope.posts = {};
                $scope.posts = result;

                if(!$scope.tag)
                    $scope.tag = {};
                $scope.tag = hashtag;
            }
        });

    };

    $scope.discover = function(hashtag){
        discover(hashtag);
    };

    $scope.showChart = function(ht) {
        HashtagService.getbyhashtag(ht, function(result) {
            if(result){
                var scope = angular.element($("#dataVisual")).scope();
                scope.hashtag = result;

                var myPopup = $ionicPopup.show({
                    templateUrl: 'templates/pieChart.html',
                    scope: $scope,
                    buttons: [
                        { text: 'Close' }
                    ]
                });

            }
        })

    };

    // this function refreshes
    $scope.refresh = function() { // this function is executed when the user drags down the interface to refresh the popular

        if($scope.showall) {
            initializeTrending(); // to refresh the popular
        }
        else{
            discover($scope.tag);
        }
        $scope.$broadcast('scroll.refreshComplete');
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
            if(entry.trim() != "") {
                tags += "#" + entry + " ";
            }
        });
        return tags;
    };

    initializeTrending();

    $scope.showTrending = function() {
        initializeTrending();
    };

    $scope.toProfile = function(username) {
        $state.go('profile', {username : username});
    };

})

.controller('SignUpCtrl',function($scope, SignupService, $state, $ionicPopup, $timeout, $http, $ionicModal) {

 // Triggered on a button click, or some other target

$scope.showImages = function() {
    $scope.showModal('templates/image-popover.html');
  }
 
  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }
 
  // Close the modal
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

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

  $scope.emailCheck = function() {
    if(!$scope.signup.email) {
      $('.emailText').text("Invalid Email Format");
      $('.emailText').attr("placeholder","Please Enter a Valid Email Address");
      $('.emailText').css("color","red");
    }
    else {
     $('.emailText').text("Email");
     $('.emailText').css("color","black");
   }
 };

 $scope.compareTo = function() {
  if($scope.signup.password === $scope.signup.confirmPassword) {
    $('.confirmText').text("Passwords Match");
    $('.confirmText').css("color","green");
  }

  else {
    $('.confirmText').text("Passwords Do Not Match");
    $('.confirmText').css("color","red");
  }
};

$scope.submitForm = function() {
  $scope.data = {}
  var userExists = false;

  if(!$scope.signup || !$scope.signup.firstName || !$scope.signup.lastName || !$scope.signup.email || !$scope.signup.bitName || !$scope.signup.password){
    shakeShakeShake();
    return;
  }

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
      userExists=true;
      shakeShakeShake();
    });

    function shakeShakeShake() {
      //turn red
      var placer = "";
      if(!$scope.signup){
        placer+=".itemWhole";
      }
      if($scope.signup) {
        if(userExists) {
          userExists=false;
          $('.bitText').text("BitName Already Exists");
          $('.bitText').attr("placeholder","Please Change BitName");
          $('.bitText').css("color","red");
          if(!placer) {
            placer+=".itemBit";
          }
          if(placer) {
            placer+=",.itemBit";
          }
        }
        if(!$scope.signup.firstName)  {
          if(!placer) {
            placer+=".itemFirst";
          }
          if(placer) {
            placer+=",.itemFirst";
          }
        }
        if(!$scope.signup.lastName) {
          if(!placer) {
            placer+=".itemLast";
          }
          if(placer) {
            placer+=",.itemLast";
          }
        }
        if(!$scope.signup.email) {
          $('.emailText').text("Invalid Email Format");
          $('.emailText').attr("placeholder","Please Enter a Valid Email Address");
          $('.emailText').css("color","red");
          if(!placer) {
            placer+=".itemEmail";
          }
          if(placer) {
            placer+=",.itemEmail";
          }
        }
        if(!$scope.signup.bitName) {
          if(!placer) {
            placer+=".itemBit";
          }
          if(placer) {
            placer+=",.itemBit";
          }
        }
        if(!$scope.signup.password) {
          if(!placer) {
            placer+=".itemPass";
          }
          if(placer) {
            placer+=",.itemPass";
          }
        }
      }

      $(".invalidText").css("opacity", "1");
      $(".invalidHolder").addClass("invalid");

      //shake!
      var interval = 50;
      var distance = 10;
      var times = 4;

      $(placer).css('position','relative');

      for(var iter=0;iter<(times+1);iter++){
        $(placer).animate({
          left:((iter%2==0 ? distance : distance*-1))
        },interval);
      }

      $(placer).animate({ left: 0},interval);
    }
  };
});
