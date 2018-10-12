/**
 * the firebase 'way' is so much easier to implement compared to the GCP API
 */
import * as functions from 'firebase-functions';

/**
 * adapter.js translates firebase functions entry-point into the classical model,
 * this way, we can keep on using fancy classes and convert the various forms of requests
 * into what we intended to use
 * 
 * additionally we get to simplify index.js into human-glanceable single-liners to give
 * us an overview of the functions that we are deploying
 */
import { pubSubToScraper, httpToScraper } from './adapter';

/**
 * gcloud pubsub topics publish projects/PROJECT/topics/TOPIC \
 * --message \
 * '{"id":"test2", "initialPage": "https://google.com", "steps": [{"order": 1, "type": "SCREENSHOT", "config": {"filename": "homepage.png", "width": "1080", "height":"750"}}]}'
 */
export const harvestWebscraper = functions.pubsub.topic('harvest-webscraper').onPublish(pubSubToScraper);

/**
 * curl -X POST \
 * "https://REGION-PROJECT.cloudfunctions.net/FUNCTION" \
 * -H "Content-Type:application/json" \
 * --data \
 * '{"id":"test2", "initialPage": "https://google.com", "steps": [{"order": 1, "type": "SCREENSHOT", "config": {"filename": "homepage.png", "width": "1080", "height":"750"}}]}'
 */
export const harvestWebscraperHTTP = functions.https.onRequest(httpToScraper);