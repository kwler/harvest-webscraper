import * as puppeteer from 'puppeteer';
import * as _ from 'lodash';

import * as Storage from '@google-cloud/storage';

export enum StepType {
    CLICK_ELEMENT = 'CLICK_ELEMENT',
    STORE_SCREENSHOT = 'STORE_SCREENSHOT',
    STORE_HTML = 'STORE_HTML',
    STORE_PDF = 'STORE_PDF'
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

        if (request.steps) {
            for(const step of request.steps) {
                results.push(await this.performStep(page, request, step));
            };
        }

        const response = new ScraperResponse(request.id, res.ok(), results);

        await page.close();
        await browser.close();

        return response;
    }

    async performStep(page, request, step: Step): Promise<StepResult> {
        //TODO: perform step
        console.log(`Performing Step #${request.steps.indexOf(step)}: ${step.type}`);
        console.log(step.config);

        const storageClient = new Storage({});
        const bucket = storageClient.bucket(process.env.STORAGE_BUCKET);

        if (step.type === StepType.STORE_SCREENSHOT) {
            const fileLocation = `${request.id}/${step.config["filename"]}`;
            const file = bucket.file(fileLocation);
            const stream = file.createWriteStream({
                metadata: {
                    contentType: 'image/png'
                }
            });
            
            await page.setViewport({ width: 1920, height: 1080 });
            const screenshot = await page.screenshot();
            await stream.write(screenshot);
            stream.end();
        } else if (step.type === StepType.STORE_PDF) {
            const fileLocation = `${request.id}/${step.config["filename"]}`;
            const file = bucket.file(fileLocation);
            const stream = file.createWriteStream({
                metadata: {
                    contentType: 'application/pdf'
                }
            });

            await page.emulateMedia('screen');
            const pdf = await page.pdf({width: '1920px', height: '1080px'});
            await stream.write(pdf);
            stream.end();
        } else if (step.type === StepType.STORE_HTML) {
            const fileLocation = `${request.id}/${step.config["filename"]}`;
            const file = bucket.file(fileLocation);
            const stream = file.createWriteStream({
                metadata: {
                    contentType: 'application/html'
                }
            });

            const body = await page.evaluate(el => el.innerHTML, await page.$('body'));
            stream.end(body);
        } else {
            console.warn(`NoOp: No handler fro the following step: ${step.type}`);
        }

        return Promise.resolve(new StepResult(step, step.config));
    }

    async log(page): Promise<void> {
        const head = await page.evaluate(el => el.innerHTML, await page.$('head'));
        console.log(`Head: ${head.substring(0,1000)}`);

        const body = await page.evaluate(el => el.innerHTML, await page.$('body'));
        console.log(`Body: ${body.substring(0,1000)}`);
    }
    
}