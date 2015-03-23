angular.module('starter.services', [])

.factory('Following', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var following = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return following;
    },
    remove: function(chat) {
      following.splice(following.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (following[i].id === parseInt(chatId)) {
          return following[i];
        }
      }
      return null;
    }
  }
})

.factory('Notifications', function() {
  // fake testing data! we will want to query our Mongo DB to get notifications

  var notifications = [{
    following: 1,
    reply: 0,
    booleOutId: null,
    userId: 1234,
    context: userId + " followed you!",
    notificationId: 0
  }, {
    following: 0,
    reply: 1,
    booleOutId: 3241,
    userId: 4321,
    content: userId + " replied to your booleOut " + booleOutId,
    notificationId: 1
  }];

  return {
    all: function() {
      return notifications;
    }
    get: function(notificationId) {
      return notifications[notificationId];
    }
  }
})
/**
 * factory to return booleOuts. Dummy data for now, requires a call to the database.
 */
.factory('booleOuts', function() {
  // dummy data
  var posts = [{
    bit: 1,
    content: '#booleYou',
    username: 'djsaunde'
  }, {
    bit: 0,
    content: '#booleMe',
    username: 'djsaunde'
  }];

  return {
    all: function() {
      return posts;
    },
    add: function(date) {
      posts.push({ bit: 1,
                   content: date,
                   username: 'djsaunde' });
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Followers', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var followers = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return followers;
    },
    get: function(followerID) {
      // Simple index lookup
      return followers[followerID];
    }
  }
});
