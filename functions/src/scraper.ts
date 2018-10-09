import * as puppeteer from 'puppeteer';
import * as _ from 'lodash';

/**
 * instructions for performing a web scraping harvest
 */
export class ScraperRequest {
    public id: string;
    public initialPage: string;

    static from(json: any) {
        const scraperRequest = new ScraperRequest();
        return _.assign(scraperRequest, json);
        //return scraperRequest;
    }

    toString(): string {
        return `id=${this.id}, initialPage=${this.initialPage}`;
    }
    
    isValid(): boolean {
        return this.id !== undefined && this.initialPage !== undefined;
    }

    isInvalid(): boolean {
        return !this.isValid();
    }
}

/**
 * the result of the web scraping request
 */
export class ScraperResponse {
    constructor(readonly id: string, readonly success: boolean) {}
}

/**
 * a higher level API for performing a web scraping harvest
 */
export class Scraper {

    async scrape(request: ScraperRequest): Promise<ScraperResponse> {
        if (request.isInvalid()) return Promise.resolve(new ScraperResponse(request.id, false)); 

        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        const res = await page.goto(request.initialPage, {
            timeout: 0,
            waitUntil: 'networkidle0'
        });

        const myElem = await page.$('head');
        const myContents = await page.evaluate(el => el.innerHTML, myElem);
        console.log(`Head: ${myContents.substring(0,1000)}`);

        const response = new ScraperResponse(request.id, res.ok());

        await page.close();
        await browser.close();

        return response;
    }
    
}