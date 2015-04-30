angular.module('starter.services', [])

/**
 * factory to return booleOuts. Dummy data for now, requires a call to the database.
 */
 .service('booleOuts', function($http) { // factory (and other) methods which return different subsets of booleOuts
  return {
    all: function(cb) { // returns all booleOuts in database

      $http.get('http://booleyou-server.herokuapp.com/api/booleout/booleOuts').
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    getBooleOut: function(_id, cb) { // returns booleOuts that are not replies and also are posted by those in following list
      $http.get('http://booleyou-server.herokuapp.com/api/booleout/booleOuts/' + _id).
      success(function(data, status, headers, config) {
          cb(data);
      }).
      error(function(data, status, headers, config) {
          cb();
      });
    },
    getParents: function(cb) { // returns booleOuts that are not replies
      $http.get('http://booleyou-server.herokuapp.com/api/booleout/getParents').
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    getFollowingParents: function(username, cb) { // returns booleOuts that are not replies and also are posted by those in following list
      $http.get('http://booleyou-server.herokuapp.com/api/booleout/getfollowerbooleouts/' + username).
          success(function(data, status, headers, config) {
              cb(data);
          }).
          error(function(data, status, headers, config) {
              cb();
          });

    },
    getReplies: function(parentid, cb) { // returns all reply-type booleOuts
      var apiUrl = "http://booleyou-server.herokuapp.com/api/booleout/getreplies/" + parentid;
      $http.get(apiUrl).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    getByUser: function(username, cb) { // returns all booleOuts belonging to a particular user
      var apiUrl = "http://booleyou-server.herokuapp.com/api/booleout/getbooleouts/" + username;
      $http.get(apiUrl).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    postBooleOut: function(booleOut, cb) { // method to post a booleOut to the database
      $http.post('http://booleyou-server.herokuapp.com/api/booleout/booleOuts', booleOut).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb(data);
      });
    },
    postReply: function(booleOut, cb) { // method to post a reply-type booleOut to the database
      $http.post('http://booleyou-server.herokuapp.com/api/booleout/booleOuts', booleOut).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb(data);
      });
    },
    parseBooleOut: function(string) { // method to convert text in input box to a properly formatted booleOut string
      if (string.charAt(0) != '#') {
        string = '#' + string;
      }
      return string.replace(/ /g, "").replace("#", "").split("#");
    }
  }
})

.service('ImageService', function($http) { // methods to work with photo objects
  var profileStringFinal = "";
  return {  
    setProfileString: function(profileString) {
      profileStringFinal = profileString;
    },

    // getProfileString: function() {
    //   return profileStringFinal;
    // },

    sendPhoto: function(username) { // method to post picture to database
      if(profileStringFinal.length < 10) {
        profileStringFinal = "img/defaultProfile.png";
      }
      var image = {
        username : username,
        picture : profileStringFinal
      };

      $http.post("http://booleyou-server.herokuapp.com/api/user/addpropic/" + username, image).
      success(function(data, status, headers, config) {
        //cb(data);
      }).
      error(function(data, status, headers, config) {
        //cb(data);
      });
    },

    getPhoto: function(username, cb) { // method to retrieve photo from database
      $http.get('http://booleyou-server.herokuapp.com/api/user/getpropic/' + username).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb(data);
      });
    }
  }
})

.service('HashtagService', function($http) { // factory methods to work with hashtag objects
  return {
    getbyhashtag: function(hashtag, cb) { // method to get a particular hashtag object
      $http.get('http://booleyou-server.herokuapp.com/api/hashtag/getbyhashtag/' + hashtag).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb(data);
      });
    },
    getbyuser: function(username, cb) { // method that returns all hashtags associated with a user
      $http.get('http://booleyou-server.herokuapp.com/api/hashtag/getbyuser/' + username).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb(data);
      });
    },

    getbooleouts: function(hashtag, cb) { // method that retrieves all booleOuts containing a particular hashtag
      $http.get('http://booleyou-server.herokuapp.com/api/hashtag//getbooleoutsbyhashtag/' + hashtag).
          success(function(data, status, headers, config) {
              cb(data);
          }).
          error(function(data, status, headers, config) {
              cb(data);
          });
    }

  }
})

.service('LoginService', function($q, $http) { // service to login a user, creates singleton object via passport.js
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

.service('UserService', function($http) { // methods that allow the client to get profile data, and to work with following logic
  return {
    fetchProfileData: function(user_name, cb) { // method to retrieve the data of a profile upon visiting a profile page
      var url = 'http://booleyou-server.herokuapp.com/api/user/users/' + user_name;
      $http.get(url).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    addFollowing: function(toFollow, user, cb) { // method to add a user to the following array
      $http.get('http://booleyou-server.herokuapp.com/api/user/' + user.username + '/follow/' + toFollow).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    removeFollowing: function(toUnFollow, user, cb) { // method to remove a user from the following array
      $http.get('http://booleyou-server.herokuapp.com/api/user/' + user.username + '/unfollow/' + toUnFollow).
      success(function(data, status, headers, config) {
        cb(data);
      }).
      error(function(data, status, headers, config) {
        cb();
      });
    },
    isFollowing: function (isFollow, username, cb) { // method to check if you are currently following a user
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

.service('SettingsService', function($q, $http) { // method heads to change account settings
  return {
    changeUserName: function(oldUserName, user) { // change user name
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
      };
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      };
      return promise;
    },

    changePassword: function(user, pw) { // change password
      var deferred = $q.defer();
      var promise = deferred.promise;
      console.log(user.username + " " + pw);

      var url = 'http://booleyou-server.herokuapp.com/api/user/changepass/' + user.username;
      var dataToSend = {
        newPassword : pw
      };
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
      };
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      };
      return promise;
    }
  }
})
.service('SignupService', function($q, $http) { // service to register a user and create a new user object that is put into the database
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
})
.service('TrendingService', function($http) { // methods to work with trending retrieval
    return {
        getTrending: function(cb) { // gets the trending hashtags in order of most posted
            $http.get('http://booleyou-server.herokuapp.com/api/hashtag/trending').
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {
                    cb();
                });
        }
    }
})
;
