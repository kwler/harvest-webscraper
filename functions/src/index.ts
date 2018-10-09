import * as functions from 'firebase-functions';
import { pubSubToScraper, httpToScraper } from './adapter';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

/**
 * gcloud pubsub topics publish projects/PROJECT/topics/TOPIC --message '{"id":"test","initialPage":"https://google.com"}' 
 */
export const harvestWebscraper = functions.pubsub.topic('harvest-webscraper').onPublish(pubSubToScraper);

/**
 * curl -X POST \
 * "https://REGION-PROJECT.cloudfunctions.net/FUNCTION" \
 * -H "Content-Type:application/json" \
 * --data '{"id":"test", "initialPage": "https://google.com"}'
 */
export const harvestWebscraperHTTP = functions.https.onRequest(httpToScraper);