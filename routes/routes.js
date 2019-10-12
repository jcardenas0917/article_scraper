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
            let hbsObject = {
                articles: data
            };
            res.render("index", hbsObject);
        })
    });
    app.get("/saved", function (req, res) {
        db.Article.find({}, function (err, data) {
            let hbsObject = {
                articles: data
            };
            console.log(data)
            res.render("saved", hbsObject);
        });
        // db.Comment.find({}, function (err, note) {
        //     let commentObject = {
        //         comment: note
        //     };
        //     console.log(note)
        //     res.render("saved", commentObject);
        // })
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

    app.put("/save-Article/:id", function (req, res) {
        db.Article.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { saved: true }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.delete("/delete-Article/:id", function (req, res) {
        db.Article.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: { saved: false }
            }).then(function (data) {
                res.json(data);
            });
    });

    app.post("/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Comment.create(req.body)
            .then(function (dbComment) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: dbComment._id } }, { new: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-comment/:id", function (req, res) {
        db.Comment.findByIdAndRemove(req.params.id, (err, comment) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });

    });

    app.get("/display-saved/", function (req, res) {
        db.Article.find(
            { saved: true }
        ).then(function (data) {
            res.json(data);
        });
    });
};