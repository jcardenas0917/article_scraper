let mongojs = require("mongojs");
let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models");
module.exports = function (app) {

    // Database configuration
    app.get("/scrape", function (req, res) {
        // Make a request via axios for the article section of reddit
        axios.get("https://www.nytimes.com/section/world").then(function (response) {
            // Load the html body from axios into cheerio
            var $ = cheerio.load(response.data);
            // For each element with a "title" class
            $("article").each(function (i, element) {
                // Save the text and href of each link enclosed in the current element
                let result = {};
                result.title = $(element).children().children("h2").text();
                result.link = $(element).find("a").attr("href");
                result.snip = $(element).children().children("p").text();


                db.Article.create(result)
                    .then(dbArticle => {
                        console.log(dbArticle)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
            // Send a "Scrape Complete" message to the browser
            res.send("Scrape Complete");
        });
    });

    app.get("/", function (req, res) {
        db.Article.find({}, function (err, data) {
            // let hbsObject = {
            //     articles: data
            // };
            // console.log(data)
            res.render("index");
        })
    });
    app.get("/articles", function (req, res) {
        // Find all results from the scrapedData collection in the db
        db.Article.find({}, function (error, data) {
            console.log(data)
            res.json(data);
        });
    });

    app.get("/drop", function (req, res) {
        // Find all results from the scrapedData collection in the db
        db.Article.deleteMany({}, function (err, del) {

        });
        res.send("Collection Dropped")
    });
};