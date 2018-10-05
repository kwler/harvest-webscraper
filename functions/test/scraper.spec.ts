import { expect } from 'chai';
import { Scraper, ScraperRequest } from '../src/scraper'
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
    
});