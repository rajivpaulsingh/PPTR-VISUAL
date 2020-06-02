const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('Visual Regression Testing', () => {

    let browser
    let page

    beforeAll(async function() {
        browser = await puppeteer.launch( {
            headless: true,
            slowMo: 0
        })
        page = await browser.newPage()
    })

    afterAll(async function() {
        await browser.close()
    })

    it('Full page snapshot test', async function() {
        await page.goto('https://www.example.com')
        await page.waitForSelector('h1')
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot( {
            failureThresholdType: 'pixel',
            failureThreshold: 500
        })
    })
})