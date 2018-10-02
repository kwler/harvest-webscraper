const puppeteer = require('puppeteer');

async function meh(url) {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(url)
    const html = await page.$eval('body', e=> e.innerHTML);
    console.log('HTML: ' + html)
}

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.pubSub = (event, context) => {
  const pubsubMessage = event.data;
  console.log('Upd8');
  const url = Buffer.from(pubsubMessage, 'base64').toString();
  const result = meh(url);
};


