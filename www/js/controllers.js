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

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

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
});

