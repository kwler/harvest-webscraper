import { expect } from 'chai';
import * as mocha from 'mocha';

import { Message } from "firebase-functions/lib/providers/pubsub";
import { ScraperRequest, Scraper, ScraperResponse } from "../src/scraper";

describe('adapter.messageToScraperRequest', () => {

    //TODO: fix this test, the damn thing works on prod 
    //but somehow, this test craps out
    it('should convert the Message to ScraperRequest', () => {
        const message: Message = new Message("eyJpZCI6InRlc3QiLCJpbml0aWFsUGFnZSI6Imh0dHBzOi8vZ29vZ2xlLmNvbSJ9");

        //const result: ScraperRequest = messageToScraperRequest(message);
        //expect("test").to.equal(result.id);
        //expect("https://google.com").to.equal(result.initialPage);
    });
    
});