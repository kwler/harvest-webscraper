//@ts-check
const puppeteer = require('puppeteer');

class Scraper {

    async meh() {
        const url = 'https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md';
        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto(url, {
            timeout: 0,
            waitUntil: 'networkidle0'
        });
        const html = await page.$eval('body', e=> e.innerHTML);
        console.log('HTML: ' + html)
    }
}

module.exports = Scraper;