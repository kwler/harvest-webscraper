import { Message } from "firebase-functions/lib/providers/pubsub";
import { EventContext } from "firebase-functions";
import * as express from "express";
import { ScraperRequest, Scraper, ScraperResponse } from "./scraper";

/**
 * 
 * @param request the scrape instructions
 * @returns the processed data
 */
async function processInternal(request: ScraperRequest): Promise<ScraperResponse> {
    const scraper = new Scraper();
    const response = await scraper.scrape(request);
    console.log("Scraper Returned:");
    console.log(response);
    return response;
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

    await processInternal(scrapeRequest);
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