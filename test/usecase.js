/**
 * Created by hugo on 4/26/15.
 */

module.exports = {
    'login and see the global bitstream' : function (client) {
        client
            .url('http://booleyou-client.herokuapp.com')
            .waitForElementVisible('body', 1000)
            .assert.title('Welcome') // check if go to the welcome screen
            .assert.visible('a[name=login]')
            //.assert.visible('a[name=login]')
            .click('a[name=login]')
            .pause(2000)
            .assert.containsText('ol#rso li:first-child',
            'Rembrandt - Wikipedia')
            .end();
    }
};