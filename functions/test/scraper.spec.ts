import { expect } from 'chai';
import { Scraper, ScraperRequest, Step, StepType } from '../src/scraper'
import 'mocha';

describe('scraper', () => {

    it('should return ok when page loaded successfully', async () => {
        let scraper = new Scraper();

        let request = new ScraperRequest();
        request.initialPage = 'https://github.com/kwler';
        request.id = 'test';

        const response = await scraper.scrape(request);

        expect(true).to.equal(response.success);
    });

    it('should return the same id', async () => {
        let scraper = new Scraper();
        let myId = 'test';

        let request = new ScraperRequest();
        request.initialPage = 'https://github.com/kwler';
        request.id = myId;

        let response = await scraper.scrape(request);

        expect(myId).to.equal(response.id);
    });
    
    it('should take a screenshot', async () => {
        let scraper = new Scraper();
        //TODO: write a test

        const takeScreenshot = new Step();
        takeScreenshot.order = 1;
        takeScreenshot.type = StepType.SCREENSHOT;
        takeScreenshot.config = new Map([
            ['filename', 'file.jpg']
        ]);

        const req = new ScraperRequest();
        req.id = 'testscreenshot';
        req.initialPage = 'https://github.com/kwler';
        req.steps = Array<Step>(takeScreenshot);

        const resp = await scraper.scrape(req);

        expect(true).to.equal(resp.success);
    });
});