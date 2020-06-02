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

    it('Single element snapshot test', async function() {
        await page.goto('https://www.example.com')
        const h1 = await page.waitForSelector('h1')
        const image = await h1.screenshot()
        expect(image).toMatchImageSnapshot( {
            failureThreshold: 'percent',
            failureThreshold: 0.01
        })
    })

    it('Mobile snapshot test', async function() {
        await page.goto('https://www.example.com')
        await page.waitForSelector('h1') 
        await page.emulate(puppeteer.devices['iPhone X'])
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot( {
            failureThreshold: 'percent',
            failureThreshold: 0.01
        })
    })

    it('Tablet snapshot test', async function() {
        await page.goto('https://www.example.com')
        await page.waitForSelector('h1')
        await page.emulate(puppeteer.devices['iPad landscape'])
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot( {
            failureThreshold: 'percent',
            failureThreshold: 0.01
        })
    })

    it('Remove element before snapshot test', async function() {
        await page.goto('https://www.example.com')
        await page.evaluate(() => {
            ;(document.querySelectorAll('h1') || []).forEach(el => el.remove())
        })
        await page.waitFor(3000)
    })
})