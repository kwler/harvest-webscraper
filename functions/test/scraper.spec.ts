import { expect } from 'chai';
import { Scraper, ScraperRequest, Step, StepType } from '../src/scraper'
import 'mocha';
import { isRegExp } from 'util';

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
        takeScreenshot.type = StepType.STORE_SCREENSHOT;
        takeScreenshot.config = new Map([
            ['filename', 'file.jpg']
        ]);

        const req = new ScraperRequest();
        req.id = 'testscreenshot';
        req.initialPage = 'https://github.com/kwler';
        //req.steps = Array<Step>(takeScreenshot);

        const resp = await scraper.scrape(req);

        expect(true).to.equal(resp.success);
    });

    it('should convert a json string into a proper request definition', () => {
        const json: string = `{
            "id": "test",
            "initialPage": "https://google.com",
            "steps": [{
                "order": 1,
                "type": "SCREENSHOT",
                "config": {
                    "filename": "homepage.png",
                    "width": "1080",
                    "height": "750"
                }
            }]
        }`;

        const result: ScraperRequest = ScraperRequest.from(JSON.parse(json));

        expect("test").to.equals(result.id);
        expect("https://google.com").to.equals(result.initialPage);

        const step = result.steps[0];

        expect(1).to.equals(step.order);
        expect(StepType.STORE_SCREENSHOT).to.equals(step.type);

        const config = step.config;

        expect("homepage.png").to.equals(config['filename']);
        expect("1080").to.equals(config['width']);
        expect("750").to.equals(config["height"]);
    });
});