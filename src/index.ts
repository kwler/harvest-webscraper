import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const harvestWebScraper = functions.pubsub.topic('harvest-scraper').onPublish((message) => {
    console.log('My Message Body:');
    console.log(message.data ? Buffer.from(message.data, 'base64').toString() : 'No Data');
});