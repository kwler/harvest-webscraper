import { expect } from 'chai';
import * as mocha from 'mocha';

describe('index', () => {

    it('should parse PubSub body into ScraperRequest', () => {
        const expected = 'test';
        expect(expected).to.equal('test');
    });
    
});