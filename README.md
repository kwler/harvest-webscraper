# Harvest: Web Scraper
A simple web scraper that takes a snapshot of a target website

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
```