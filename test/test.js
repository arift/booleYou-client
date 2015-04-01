var assert = require("assert"); // node.js core module
var should = require('should'); 
var request = require('supertest');

describe('Front End Testing', function(){
	var url = 'http://booleyou-client.herokuapp.com';
  	describe('Welcome Screen Test', function(){
    	it('should be directed to welcome screen', function(done){
    		request(url)
    		.get('/#/welcome')
    		.expect(200)
    		.end(function(err, res) {
    			if(err) {
    				throw err;
    			}
	    		done();

    		})
      		
      	});

      	it('check if the welcome screen is populated correctly', function(done){
    		request(url)
    		.get('/#/welcome')
    		.expect(200)
    		.end(function(err, res) {
    			if(err) {
    				throw err;
    			}
    			res.body.should.be.okay;
	    		done();

    		})
      		
      	});
      	
    });

    describe('Go to login screen', function(){
    	it('should be directed to login screen', function(done){
    		request(url)
    		.get('/#/login')
    		.expect(200)
    		.end(function(err, res) {
    			if(err) {
    				throw err;
    			}
	    		done();

    		})
      		
      	});

      	it('Check if the login screen is populated correctly', function(done){
    		request(url)
    		.get('/#/login')
    		.expect(200)
    		.end(function(err, res) {
    			if(err) {
    				throw err;
    			}
    			res.body.should.be.okay;
	    		done();

    		})
      		
      	});
    });

    describe('Go to login screen', function(){
    	it('should be directed to login screen', function(done){
    		request(url)
    		.get('/#/login')
    		.expect(200)
    		.end(function(err, res) {
    			if(err) {
    				throw err;
    			}
	    		done();

    		})
      		
      	});

      	it('Check if the login screen is populated correctly', function(done){
    		request(url)
    		.get('/#/login')
    		.expect(200)
    		.end(function(err, res) {
    			if(err) {
    				throw err;
    			}
    			res.body.should.be.okay;
	    		done();

    		})
      		
      	});
    });

    describe('BitStream', function(){
    	it('should be directed to bitstream after login information is correct', function(done){
    		request(url)
    		.get('/#/tab/BitStream')
    		.expect(200)
    		.end(function(err, res) {
    			if(err) {
    				throw err;
    			}
	    		done();

    		})      		
      	});      
    });

    describe('Profile Page', function(){
    	it('Check if the profile page is populated correctly', function(done){
    		request(url)
    		.get('/#/profile/')
    		.expect(200)
    		.end(function(err, res) {
    			if(err) {
    				throw err;
    			}
    			res.body.should.be.okay;
	    		done();

    		})
      		
      	});      
    });
});