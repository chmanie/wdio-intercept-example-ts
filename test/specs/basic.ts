import * as assert from 'assert'
import { ExpectedRequest } from 'wdio-intercept-service'

describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url('https://webdriver.io')
        browser.setupInterceptor()
        browser
          .expectRequest('GET', /foo/, 404)
          .expectRequest('POST', /bar/, 200)
          .getTitle()
        const title = browser.getTitle()
        const exp = browser.getExpectations()
        browser.resetExpectations()
        browser.assertRequests()
        browser.assertExpectedRequestsOnly()
        const { method } = browser.getRequest(1)

        assert.strictEqual(title, 'WebdriverIO · Next-gen WebDriver test framework for Node.js')
    })
})
