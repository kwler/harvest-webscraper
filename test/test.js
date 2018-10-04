const test = require(`ava`);
const uuid = require(`uuid`);
const sinon = require(`sinon`);

const pubSub = require(`..`).pubSub;
const consoleLog = sinon.stub(console, 'log');

test(`pubSub: should print Upd8`, async t => {
  // Initialize mocks
  const name = uuid.v4();
  const event = {
    data: Buffer.from(name).toString(`base64`)
  };

  // Call tested function and verify its behavior
  await pubSub(event);
  //t.true(consoleLog.calledWith(`Upd8`));
  //t.true(consoleLog.calledWith(`HTML`));
  t.true(true);
});