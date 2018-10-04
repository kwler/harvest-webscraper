"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.harvestWebScraper = functions.pubsub.topic('harvest-scraper').onPublish((message) => {
    console.log('My Message Body:');
    console.log(message.data ? Buffer.from(message.data, 'base64').toString() : 'No Data');
});
//# sourceMappingURL=index.js.map