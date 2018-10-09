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
 * exported for testing isolation purposes
 * 
 * @param message
 */
export function messageToScraperRequest(message: Message): ScraperRequest {
    console.log(`Message Data: ${message.data}`)

    const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : '{}';

    console.log("JSON.parse");
    const parsed = JSON.parse(messageBody);
    console.log(parsed);
    const scrapeRequest: ScraperRequest = ScraperRequest.from(parsed);
    console.log("Parsed Scraper Request from PubSub:");
    console.log(scrapeRequest.toString());
    
    return scrapeRequest;

    // const scr = new ScraperRequest();
    // scr.initialPage = "https://google.com";
    // scr.id = "test";

    // return scr;
}

/**
 * converts a PubSub message into a scrape request
 * 
 * @param message
 * @param context 
 */
export async function pubSubToScraper(message: Message, context: EventContext) {
    console.log("Message:");
    console.log(message);
    console.log("Context:");
    console.log(context);

    await processInternal(messageToScraperRequest(message));
}

/**
 * converts a REST request into a scrape request
 * 
 * @param req http request
 * @param resp http response
 */
export async function httpToScraper(req: express.Request, resp: express.Response) {
    console.log("Request:");
    console.log(req);
    console.log("Response:");
    console.log(resp);
}