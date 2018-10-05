import * as functions from 'firebase-functions';
import { pubSubToScraper, httpToScraper } from './adapter';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const harvestWebscraper = functions.pubsub.topic('harvest-webscraper').onPublish(pubSubToScraper);
export const harvestWebscraperHTTP = functions.https.onRequest(httpToScraper);