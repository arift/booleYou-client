angular.module('starter.services', [])

/**
 * factory to return booleOuts. Dummy data for now, requires a call to the database.
 */
 .service('booleOuts', function($http) {
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
      if (string.charAt(0) != '#') {
        string = '#' + string;
      }
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
  return {
    fetchProfileData: function(user_name, cb) {
      var url = 'http://booleyou-server.herokuapp.com/api/user/users/' + user_name;
      $http.get(url).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    addFollowing: function(toFollow, user, cb) {
      $http.get('http://booleyou-server.herokuapp.com/api/user/' + user.username + '/follow/' + toFollow).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    removeFollowing: function(toUnFollow, user, cb) {
      $http.get('http://booleyou-server.herokuapp.com/api/user/' + user.username + '/unfollow/' + toUnFollow).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    isFollowing: function (isFollow, username, cb) {
      $http.get('http://booleyou-server.herokuapp.com/api/user/users/' + username).
      success(function(user, status, headers, config) {
        if (user.following.indexOf(isFollow) > -1) {
          cb(true, user);
        }
        else {
          cb(false);
        }
      }).
      error(function(data, status, headers, config) {
        cb(false);
      });
    }
  };
})

.service('SettingsService', function($q, $http) {
  return {
    changeUserName: function(oldUserName, user) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var url = 'http://booleyou-server.herokuapp.com/api/user/users/' + oldUserName;

      console.log(url);
      $http.put(url, user).
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
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    },

    changePassword: function(user, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      console.log(user.username + " " + pw);

      var url = 'http://booleyou-server.herokuapp.com/api/user/changepass/' + user.username;
      var dataToSend = {
        newPassword : pw
      }
      $http.post(url, dataToSend).
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
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
.service('SignupService', function($q, $http) {
  return {
    signupUser: function(userData) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.post('http://booleyou-server.herokuapp.com/auth/signup', userData).
      success(function(data, status, headers, config) {
        deferred.resolve();
      }).
      error(function(data, status, headers, config) {
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
});
