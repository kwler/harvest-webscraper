/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.pubSub = (event, context) => {
  const pubsubMessage = event.data;
  console.log('Upd8');
  console.log(Buffer.from(pubsubMessage, 'base64').toString());
};
