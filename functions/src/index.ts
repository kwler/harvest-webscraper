import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const harvestWebscraper = functions.pubsub.topic('harvest-webscraper').onPublish(async (message, context) => {
    console.log('Message: ');
    console.log(message);
    console.log('Context: ');
    console.log(context);

    const url = 'https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md';
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(url, {
        timeout: 0,
        waitUntil: 'networkidle0'
    });
    const html = await page.$eval('body', e=> e.innerHTML);
    console.log('HTML: ' + html);
});