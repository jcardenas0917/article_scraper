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

                // // If this found element had both a title and a link
                // if (title && link) {
                // Insert the data in the scrapedData db
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
        res.render("index");
    });

    app.get("/articles", function (req, res) {
        // Find all results from the scrapedData collection in the db
        db.Article.find({}, function (error, found) {
            // Throw any errors to the console
            if (error) {
                console.log(error);
            }
            // If there are no errors, send the data to the browser as json
            else {
                res.json(found);
            }
        });
    });

    app.get("/drop", function (req, res) {
        // Find all results from the scrapedData collection in the db
        db.Article.deleteMany({}, function (err, del) {

        });
        res.send("Collection Dropped")
    });
};