import * as puppeteer from 'puppeteer';

export class ScraperRequest {
    id: string;
    initialPage: string;
    
}

export class ScraperResponse {
    id: string;
    success: boolean;
}

/**
 * 
 */
export class Scraper {

    async scrape(request: ScraperRequest): Promise<ScraperResponse> {
        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        const res = await page.goto(request.initialPage, {
            timeout: 0,
            waitUntil: 'networkidle0'
        });

        const response = new ScraperResponse();
        response.success = res.ok();
        response.id = request.id;

        await page.close();
        await browser.close();

        return response;
    }
    
}