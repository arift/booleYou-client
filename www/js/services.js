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

/**
 * factory to return booleOuts. Dummy data for now, requires a call to the database.
 */
.service('booleOuts', function($http) {
  // this factory returns all booleOuts currently stored in the database
        var posts = [];

  // function that returns all booleOuts in the server
  return {
    all: function(cb) {

        $http.get('http://booleyou-server.herokuapp.com/api/booleout/booleOuts').
          success(function(data, status, headers, config) {
              cb(data);
          }).
          error(function(data, status, headers, config) {
              cb();
          });
    },
    getParents: function(cb) {
      $http.get('http://booleyou-server.herokuapp.com/api/booleout/getParents').
        success(function(data, status, headers, config) {
            cb(data);
        }).
        error(function(data, status, headers, config) {
            cb();
        });
    },
    getReplies: function(parentid, cb) {
      var apiUrl = "http://booleyou-server.herokuapp.com/api/booleout/getreplies/" + parentid;
      $http.get(apiUrl).
        success(function(data, status, headers, config) {
            cb(data);
        }).
        error(function(data, status, headers, config) {
            cb();
        });
    },
    postBooleOut: function(booleOut, cb) {
      $http.post('http://booleyou-server.herokuapp.com/api/booleout/booleOuts', booleOut).
        success(function(data, status, headers, config) {
            cb(data);
        }).
        error(function(data, status, headers, config) {
          console.log("booleout NOT added");
          cb(data);
        });
    },
    postReply: function(booleOut, cb) {
      $http.post('http://booleyou-server.herokuapp.com/api/booleout/booleOuts', booleOut).
        success(function(data, status, headers, config) {
          cb(data);
        }).
        error(function(data, status, headers, config) {
          cb(data);
        });
    },
    parseBooleOut: function(string) {
        return string.replace(/ /g, "").replace("#", "").split("#");
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
})

.service('LoginService', function($q, $http) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var dataToSend = {
              username : name,
              password  : pw
            };

            $http.post('http://booleyou-server.herokuapp.com/auth/login', dataToSend).
            success(function(data, status, headers, config) {
              console.log("Success!");
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              console.log("Wrong credentials.");
              deferred.reject('Wrong credentials.');
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        }
    }
})

.service('ProfileFetch', function($http) {
    // this factory returns all booleOuts currently stored in the database
  // var user_name;

  // function that returns all booleOuts in the server
  return {
    // setUsername: function(user) {
    //   user_name = user;
    // },

    // getUsername: function() {
    //   return user_name;
    // },

    fetchProfileData: function(user_name, cb) {
        var url = 'http://booleyou-server.herokuapp.com/api/user/users/' + user_name;
        console.log(url);
        $http.get(url).
            success(function(data, status, headers, config) {
                cb(data);
            }).
            error(function(data, status, headers, config) {
                cb();
            });
    },
    addFollower: function(user_name, cb) {
                
    }
  };
})

.service('SignupService', function($q, $http) {
    return {
        signupUser: function(userData) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.post('http://booleyou-server.herokuapp.com/auth/signup', userData).
            success(function(data, status, headers, config) {
              console.log("(services)Server reply: " + status);
              deferred.resolve();
            }).
            error(function(data, status, headers, config) {
              console.log("(services)Server reply: " + status);
              deferred.reject();                
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        }
    }
})

;
