import { Message } from "firebase-functions/lib/providers/pubsub";
import { EventContext } from "firebase-functions";
import * as express from "express";
import { ScraperRequest, Scraper, ScraperResponse } from "./scraper";
import * as PubSub from '@google-cloud/pubsub';
import * as Storage from '@google-cloud/storage';
import * as process from 'process';

/**
 * scrapes
 * @param request the scrape instructions
 * @returns the processed data
 */
async function processInternal(request: ScraperRequest): Promise<ScraperResponse> {
    const scraper = new Scraper();
    const response = await scraper.scrape(request);
    console.log("Scraper Returned:");
    console.log(response);

    const storageClient = new Storage({});
    const bucket = storageClient.bucket(process.env.STORAGE_BUCKET);
    const file = bucket.file(`${request.id}/index.json`);
    const stream = file.createWriteStream({
        metadata: {
            contentType: 'application/json'
        }
    });
    stream.end(Buffer.from(JSON.stringify(response)));

    return response;
}

async function publishResult(response: ScraperResponse): Promise<void> {
    const pubsubClient = new PubSub({
    });

    const topic = pubsubClient.topic(process.env.PUBSUB_TOPIC_OUTPUT);
    const pubsubMessage = {
        data: response
    };

    console.log(`Publishing Message to: ${process.env.PUBSUB_TOPIC_OUTPUT}`);
    const pubId = await topic.publisher().publish(Buffer.from(JSON.stringify(pubsubMessage)));
    console.log(`Message Published: ${pubId} to ${process.env.PUBSUB_TOPIC_OUTPUT}`);
}

/**
 * converts a PubSub message into a scrape request
 * 
 * @param message
 * @param context 
 */
export async function pubSubToScraper(message: Message, context: EventContext) {
    const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : '{}';
    const scrapeRequest: ScraperRequest = ScraperRequest.from(JSON.parse(messageBody));

    const response = await processInternal(scrapeRequest);

    await publishResult(response);
}

/**
 * converts a REST request into a scrape request
 * 
 * @param req http request
 * @param resp http response
 */
export async function httpToScraper(req: express.Request, resp: express.Response) {
    const scrapeRequest: ScraperRequest = ScraperRequest.from(req.body);

    const response = await processInternal(scrapeRequest);

    resp.send(JSON.stringify(response));
}