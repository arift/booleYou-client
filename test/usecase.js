/**
 * Created by hugo on 4/26/15.
 */

module.exports = {

    'login and see the global bitstream' : function (client) {
        client
            .url('http://booleyou-client.herokuapp.com')
            .waitForElementVisible('body', 1000)

            .assert.title('Welcome') // check if go to the welcome screen
            .assert.visible('a[name=login]') // check if the login box is shown
            .click('a[name=login]') // click login
            .pause(2000) // wait until the server responds


            .assert.visible('ion-view[view-title=Login]') // check if the Login page renders
            .assert.visible('input[type=text]') // check if the username box is shown
            .assert.visible('input[type=password]') // check if the login box is shown
            .setValue('input[type=text]', 'test1')// set the test username, in this case "test1"
            .setValue('input[type=password]', 'test1')// set the test user password, in this case "test1"
            .assert.visible('button[type=submit]') // check if the login box is shown
            .click('button[type=submit]') // submit the login information
            .pause(2000)

            .assert.visible('ion-view[view-title=BitStream]') // check if the user sees BitStream
            .pause(2000)
            .end();
    },



    'login and see the Profile' : function (client) {
        client
            .url('http://booleyou-client.herokuapp.com')
            .waitForElementVisible('body', 1000)

            .assert.title('Welcome') // check if go to the welcome screen
            .assert.visible('a[name=login]') // check if the login box is shown
            .click('a[name=login]') // click login
            .pause(1000) // wait until the server responds


            .assert.visible('ion-view[view-title=Login]') // check if the Login page renders
            .assert.visible('input[type=text]') // check if the username box is shown
            .assert.visible('input[type=password]') // check if the login box is shown
            .setValue('input[type=text]', 'test1')// set the test username, in this case "test1"
            .setValue('input[type=password]', 'test1')// set the test user password, in this case "test1"
            .assert.visible('button[type=submit]') // check if the login box is shown
            .click('button[type=submit]') // submit the login information
            .pause(4000)

            .assert.visible('ion-view[view-title=BitStream]') // check if the user sees BitStream

            .pause(1000)
            .assert.visible('a[name=Profile]') // check if the Profile link exists
            .click('a[name=Profile]') // click on the Profile
            .pause(1000)
            .assert.visible('ion-view[view-title=Profile]') // check if the user sees Profile
            .pause(2000)
            .end();
    },



    'login and see the Popular posts' : function (client) {
        client
            .url('http://booleyou-client.herokuapp.com')
            .waitForElementVisible('body', 1000)

            .assert.title('Welcome') // check if go to the welcome screen
            .assert.visible('a[name=login]') // check if the login box is shown
            .click('a[name=login]') // click login
            .pause(1000) // wait until the server responds


            .assert.visible('ion-view[view-title=Login]') // check if the Login page renders
            .assert.visible('input[type=text]') // check if the username box is shown
            .assert.visible('input[type=password]') // check if the login box is shown
            .setValue('input[type=text]', 'test1')// set the test username, in this case "test1"
            .setValue('input[type=password]', 'test1')// set the test user password, in this case "test1"
            .assert.visible('button[type=submit]') // check if the login box is shown
            .click('button[type=submit]') // submit the login information
            .pause(4000)

            .assert.visible('ion-view[view-title=BitStream]') // check if the user sees BitStream
            .assert.visible('a[name=Popular]') // check if the Popular link exists
            .pause(1000)
            .click('a[name=Popular]') // click on the Popular link
            .pause(1000)
            .assert.visible('ion-view[view-title=Popular]') // check if the user sees Popular
            .pause(2000)
            .end();
    },





    'login and post BooleOut' : function (client) {
        client
            .url('http://booleyou-client.herokuapp.com')
            .waitForElementVisible('body', 1000)

            .assert.title('Welcome') // check if go to the welcome screen
            .assert.visible('a[name=login]') // check if the login box is shown
            .click('a[name=login]') // click login
            .pause(2000) // wait until the server responds


            .assert.visible('ion-view[view-title=Login]') // check if the Login page renders
            .assert.visible('input[type=text]') // check if the username box is shown
            .assert.visible('input[type=password]') // check if the login box is shown
            .setValue('input[type=text]', 'test1')// set the test username, in this case "test1"
            .setValue('input[type=password]', 'test1')// set the test user password, in this case "test1"
            .assert.visible('button[type=submit]') // check if the login box is shown
            .click('button[type=submit]') // submit the login information
            .pause(3000)

            .assert.visible('ion-view[view-title=BitStream]') // check if the user sees BitStream page

            .assert.visible('input[name=booleOutBox]') // check if the text box esists
            .setValue('input[name=booleOutBox]', '#automatedtest#pleaseignore') // set the test booleOut
            .assert.visible('a[name=post1]') // check if the submit link exists
            .click('a[name=post1]') // click on the submit link with value 1
            .pause(1000)
            .assert.visible('ion-view[view-title=BitStream]') // check if the user directs back to BitStream
            .pause(2000)
            .end();
    }
};