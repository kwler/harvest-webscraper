//@ts-check
const Scraper = require('./scraper')

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.pubSub = async (event, context) => {
  const message = Buffer.from(event.data, 'base64').toString();
  const scraper = new Scraper();
  const result = await scraper.meh();
};


