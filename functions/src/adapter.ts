import { Message } from "firebase-functions/lib/providers/pubsub";
import { EventContext } from "firebase-functions";
import * as express from "express";

export async function pubSubToScraper(message: Message, context: EventContext) {
    console.log("Message:");
    console.log(message);
    console.log("Context:");
    console.log(context);
}

export async function httpToScraper(req: express.Request, resp: express.Response) {
    console.log("Request:");
    console.log(req);
    console.log("Response:");
    console.log(resp);
}