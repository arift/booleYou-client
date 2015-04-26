/**
 * Created by hugo on 4/26/15.
 */

module.exports = {
    //'login and see the global bitstream' : function (client) {
    //    client
    //        .url('http://booleyou-client.herokuapp.com')
    //        .waitForElementVisible('body', 1000)
    //
    //        .assert.title('Welcome') // check if go to the welcome screen
    //        .assert.visible('a[name=login]') // check if the login box is shown
    //        .click('a[name=login]') // click login
    //        .pause(2000) // wait until the server responds
    //
    //
    //        .assert.visible('ion-view[view-title=Login]') // check if the Login page renders
    //        .assert.visible('input[type=text]') // check if the username box is shown
    //        .assert.visible('input[type=password]') // check if the login box is shown
    //        .setValue('input[type=text]', 'test1')// set the test username, in this case "test1"
    //        .setValue('input[type=password]', 'test1')// set the test user password, in this case "test1"
    //        .assert.visible('button[type=submit]') // check if the login box is shown
    //        .click('button[type=submit]') // submit the login information
    //        .pause(2000)
    //
    //        .assert.visible('ion-view[view-title=BitStream]') // check if the Bitstream page renders
    //        .pause(5000)
    //        .end();
    //},

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
            .pause(2000)
            .assert.visible('ion-view[view-title=BitStream]')

            .assert.visible('ion-nav-view[name=tab-bitstream]') // check if the Profile tab icon
            .assert.visible('div[name=testing]') // check if the Profile tab icon
            .pause(2000)
            .click('div[name=testing]') // Click on the Profile tab icon
            .pause(5000)
            .assert.visible('ion-view[view-title=Profile]') // check if the Profile page renders


            .pause(5000)
            .end();
    }
};