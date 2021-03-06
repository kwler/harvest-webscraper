# Harvest: Web Scraper
[![Build Status](https://travis-ci.org/kwler/harvest-webscraper.svg?branch=master)](https://travis-ci.org/kwler/harvest-webscraper)

A simple web scraper that takes a snapshot of a target website. The keyword being "simple"; this scraper can take in and store as much data as it can, perform navigation, and store the result in multiple formats, but will never perform data extraction/processing, that step will be performed further down the line on a different project. This protects us from having to deal with site restructuring messing up with data extraction.

## Features
- [x] wait for "orders" from HTTP
- [x] wait for "orders" from PubSub
- [ ] navigate websites
- [x] take a screenshot
- [x] store the html contents
- [x] write results to HTTP response
- [x] write results to PubSub
- [x] write results to Cloud Storage
- [ ] perform other commands aside from basic navigation
- [ ] security
- [ ] DoS mitigation

## Developer "Quality-of-Life" Features
- [x] continuous integration
- [x] TypeScript
- [x] unit tests
- [ ] unit test mocks
- [ ] integration tests running on local emulator
- [x] environment variables

## Developer Notes
- install GCloud/Firebase CLI and setup account
- initial setup
```
npm install -g firebase-tools
npm install --prefix ./functions
```
- [typescript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
```
sudo npm install -g typescript
```

#### Unit Test
```
npm test --prefix ./functions
```

#### Deploy
```
firebase deploy --token $FIREBASE_TOKEN --project $FIREBASE_PROJECT --only functions
```

#### ERROR: Failed to launch chrome!
- im running node on [Ubuntu](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)
```
sudo apt-get install \
gconf-service \
libasound2 \
libatk1.0-0 \
libatk-bridge2.0-0 \
libc6 \
libcairo2 \
libcups2 \
libdbus-1-3 \
libexpat1 \
libfontconfig1 \
libgcc1 \
libgconf-2-4 \
libgdk-pixbuf2.0-0 \
libglib2.0-0 \
libgtk-3-0 \
libnspr4 \
libpango-1.0-0 \
libpangocairo-1.0-0 \
libstdc++6 \
libx11-6 \
libx11-xcb1 \
libxcb1 \
libxcomposite1 \
libxcursor1 \
libxdamage1 \
libxext6 \
libxfixes3 \
libxi6 \
libxrandr2 \
libxrender1 \
libxss1 \
libxtst6 \
ca-certificates \
fonts-liberation \
libappindicator1 \
libnss3 \
lsb-release \
xdg-utils \
wget
```

#### Notes for IntelliJ Users
- Please use Windows Linux subsystem and install NodeJS "Settings > Languages and Frameworks > Node.JS and NPM > Node Interpreter: Ubuntu"
- Settings > Languages and Frameworks > Javascript > Javascript Language Version
