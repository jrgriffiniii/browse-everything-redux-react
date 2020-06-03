
module.exports = {
  'App. header is present': function (browser) {
    browser
      .url('http://localhost:3333')
      .waitForElementVisible('h1', 10000)
      .assert.containsText('h1', 'Browse Everything')
      .end()
  }
}
