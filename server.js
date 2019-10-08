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
var databaseUrl = "redditScrape";
var collections = ["article"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/redditScrape";

mongoose.connect(MONGODB_URI);

// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
