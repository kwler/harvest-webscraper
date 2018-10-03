# Harvest: Web Scraper
[![Build Status](https://travis-ci.org/kwler/harvest-webscraper.svg?branch=master)](https://travis-ci.org/kwler/harvest-webscraper)

A simple web scraper that takes a snapshot of a target website. This works perfectly well on GCP Cloud Functions NodeJS8, but you may need to set things up in [local](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md). 

## TODO
- use [TypeScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html), and figure out how to setup stuffs in VSCode
- install [dts types](https://github.com/DefinitelyTyped/DefinitelyTyped)

## Unit Test
```
npm test
```

## Deploy
```
gcloud functions deploy harvest-webscraper \
--runtime nodejs8 \
--trigger-topic harvest-webscraper \
--entry-point pubSub \
--memory 1024mb \
--region us-central1

gcloud beta functions deploy harvest-webscraper \
--region us-central1 \
--runtime nodejs8 \
--trigger-topic harvest-webscraper \
--entry-point pubSub \
--memory 1024mb
```

## Developer Notes
- install GCloud CLI and setup account
- initial setup
```
npm install
npm install -g ava
```
- [typescript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
```
sudo npm install -g typescript
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
