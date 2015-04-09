angular.module('starter.services', [])

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

.service('UserService', function($http) {
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
    addFollower: function(following, follower, cb) {

    },
    removeFollower: function(following, follower, cb) {

    },
    isFollower: function(following, follower, cb) {
        
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
