// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "newsScrape";
var collections = ["article"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/redditScrape";

// mongoose.connect(MONGODB_URI);

app.get("/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.article.find({}, function (error, found) {
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


app.get("/scrape", function (req, res) {
    // Make a request via axios for the article section of reddit
    axios.get("https://www.nytimes.com/section/world").then(function (response) {
        // Load the html body from axios into cheerio
        var $ = cheerio.load(response.data);
        // For each element with a "title" class
        $("h2").each(function (i, element) {
            // Save the text and href of each link enclosed in the current element
            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");

            // If this found element had both a title and a link
            if (title && link) {
                // Insert the data in the scrapedData db
                db.article.insert({
                    title: title,
                    link: link
                },
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        }
                        else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });
            }
        });
    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
});
// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
