# article_scraper

Article Scraper is a web scrape app using Handlebars and MongoJS to save the data scraped from NYTimes.

## Installation

Once you clone this repo please run npm i to insall all packages.  Make sure mongod is running as well to create the database.

```bash
npm i
```

## Information

User clicks on the scrape button and the app will scrape all the articles from NY times and push the Title, link, and snip to the MongoJS database.  The user can also save an article and add and remove notes from it.

## Challenges
The major challenge was able to track the databe id's to make sure the comments were being saved correctly.

## APP
[NY Times scraper](https://fierce-bastion-27645.herokuapp.com/)
