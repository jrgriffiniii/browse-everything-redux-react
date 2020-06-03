
module.exports = {
  'App. header is present': function (browser) {
    browser
      .url('http://localhost:3333')
      .waitForElementVisible('h1', 10000)
      .assert.containsText('h1', 'Browse Everything')
      .end()
  },

  'Provider selector is present' : function (browser) {
    browser
      .url('http://localhost:3333')
      .waitForElementVisible('label[for="provider"]', 10000)
      .assert.containsText('label[for="provider"]', 'Loading providers...')
      .end()
  },

  'Status is present' : function (browser) {
    browser
      .url('http://localhost:3333')
      .waitForElementVisible('div[data-testid="resource-tree-wrapper"]', 10000)
      .assert.containsText('div[data-testid="resource-tree-wrapper"]', 'Please select a provider')
      .end()
  }
}
