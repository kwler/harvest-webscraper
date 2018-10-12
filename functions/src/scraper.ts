import * as puppeteer from 'puppeteer';
import * as _ from 'lodash';

enum StepType {
    CLICK_ELEMENT,
    SCREENSHOT,
    STORE_HTML
}

export class Step {
    order: number;
    type: StepType;
    config?: Map<string, string>;

}

/**
 * instructions for performing a web scraping harvest
 */
export class ScraperRequest {
    public id: string;
    public initialPage: string;
    public steps?: Step[];

    static from(json: any) {
        const scraperRequest = new ScraperRequest();
        return _.assign(scraperRequest, json);
    }

    toString(): string {
        return `ScraperRequest(\nid=${this.id}\ninitialPage=${this.initialPage}\nsteps=${this.steps}\n)`;
    }
    
    isValid(): boolean {
        return this.id !== undefined && this.initialPage !== undefined;
    }

    isInvalid(): boolean {
        return !this.isValid();
    }
}

export class StepResult {
    constructor(
        readonly step: Step, 
        readonly output?: Map<string, string>) {}
}

/**
 * the result of the web scraping request
 */
export class ScraperResponse {
    constructor(
        readonly id: string, 
        readonly success: boolean, 
        readonly stepResults?: StepResult[]) {}
}

/**
 * a higher level API for performing a web scraping harvest
 */
export class Scraper {

    async scrape(request: ScraperRequest): Promise<ScraperResponse> {
        if (request.isInvalid()) return Promise.resolve(new ScraperResponse(request.id, false));

        console.log(`Executing Order: ${request.toString()}`);
        console.log(request);

        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        const res = await page.goto(request.initialPage, {
            timeout: 0,
            waitUntil: 'networkidle0'
        });

        await this.log(page);

        const results = new Array<StepResult>();
        request.steps.forEach(async step => {
            results.push(await this.performStep(page, request, step));
        });

        const response = new ScraperResponse(request.id, res.ok(), results);

        await page.close();
        await browser.close();

        return response;
    }

    async performStep(page, request, step: Step): Promise<StepResult> {
        //TODO: perform step
        console.log(`Performing Step #${request.steps.indexOf(step)}: ${step.type}`);
        return Promise.resolve(new StepResult(step, step.config));
    }

    async log(page) {
        const head = await page.evaluate(el => el.innerHTML, await page.$('head'));
        console.log(`Head: ${head.substring(0,1000)}`);

        const body = await page.evaluate(el => el.innerHTML, await page.$('body'));
        console.log(`Body: ${body.substring(0,1000)}`);
    }
    
}